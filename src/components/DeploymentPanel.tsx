import { useState, useEffect } from "react";
import useAxios from "../Hooks/useAxios";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
  Alert,
  InputAdornment,
  IconButton,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Link,
  Tooltip,
  Card,
  CardContent,
  Snackbar,
  Grid
} from "@mui/material";
import { 
  Upload,
  RefreshCw,
  Trash2,
  Pause,
  Play,
  RefreshCcw,
  ExternalLink,
  CheckCircle,
  AlertCircle
} from "lucide-react";

const DeploymentPanel = ({ projectId }) => {
  const [subdomain, setSubdomain] = useState("");
  const [deploying, setDeploying] = useState(false);
  const [deploymentUrl, setDeploymentUrl] = useState(null);
  const [error, setError] = useState(null);
  const [deployments, setDeployments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deploymentToDelete, setDeploymentToDelete] = useState(null);
  const [actionInProgress, setActionInProgress] = useState({});
  const [notification, setNotification] = useState({ 
    open: false, 
    message: "", 
    severity: "success" as "success" | "error" | "warning" | "info" 
  });
  
  // Нові стани для відстеження запитів
  const [deploymentRequested, setDeploymentRequested] = useState(false);
  const [deleteRequested, setDeleteRequested] = useState(false);
  const [subdomainToDelete, setSubdomainToDelete] = useState(null);
  const [suspendRequested, setSuspendRequested] = useState(false);
  const [subdomainToSuspend, setSubdomainToSuspend] = useState(null);
  const [resumeRequested, setResumeRequested] = useState(false);
  const [subdomainToResume, setSubdomainToResume] = useState(null);
  
  const apiUrl = process.env.REACT_APP_API_URL;

  // Отримання редактора
  const editor = (window as any).editor;

  // Створюємо useAxios інстанси для різних ендпоінтів
  const deployApi = useAxios(`${apiUrl}/deploy/run`);
  const listApi = useAxios(`${apiUrl}/deploy/list`);
  const suspendApi = useAxios(`${apiUrl}/deploy/suspend`);
  const resumeApi = useAxios(`${apiUrl}/deploy/resume`);
  const deleteApi = useAxios(`${apiUrl}/deploy/destroy`);

  // Показати сповіщення
  const showNotification = (message: string, severity: "success" | "error" | "warning" | "info" = "success") => {
    setNotification({
      open: true,
      message,
      severity,
    });
  };

  // Закрити сповіщення
  const closeNotification = () => {
    setNotification(prev => ({ ...prev, open: false }));
  };

  // Функція для тригеру оновлення списку розгорнутих сайтів
  const refreshDeployments = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  // Завантаження списку розгорнутих сайтів при монтуванні компонента
  // і при зміні projectId або refreshTrigger
  useEffect(() => {
    if (projectId) {
      setLoading(true);
      listApi.sendRequest("get", { projectId });
    }
  }, [projectId, refreshTrigger]);

  // Обробка результатів запиту списку розгорнутих сайтів
  useEffect(() => {
    if (listApi.data) {
      console.log("Deployments API response:", listApi.data);

      if (Array.isArray(listApi.data)) {
        setDeployments(listApi.data);
      } else if (
        listApi.data &&
        listApi.data.deployments &&
        Array.isArray(listApi.data.deployments)
      ) {
        setDeployments(listApi.data.deployments);
      } else if (
        listApi.data &&
        listApi.data.success &&
        Array.isArray(listApi.data.data)
      ) {
        setDeployments(listApi.data.data);
      } else {
        console.warn("Unexpected API response format:", listApi.data);
        setDeployments([]);
      }

      setLoading(false);
    }

    if (listApi.error) {
      console.error("Failed to load deployments:", listApi.error);
      setError("Помилка завантаження списку розгорнутих сайтів");
      showNotification("Помилка завантаження списку сайтів", "error");
      setLoading(false);
    }
  }, [listApi.data, listApi.error]);

  // Функція розгортання сайту
  const handleDeploy = async () => {
    if (!subdomain.trim()) {
      setError("Будь ласка, введіть назву субдомену");
      showNotification("Будь ласка, введіть назву субдомену", "error");
      return;
    }

    try {
      setDeploying(true);
      setError(null);
      setDeploymentUrl(null);
      setDeploymentRequested(false);

      // Використовуємо метод для отримання ZIP архіву
      const zipBlob = await editor.createProjectZip();

      if (!zipBlob || !(zipBlob instanceof Blob)) {
        throw new Error("Не вдалося створити архів проекту");
      }

      // Створюємо FormData для відправки
      const formData = new FormData();
      formData.append("zipFile", zipBlob, "site.zip");
      formData.append("subdomain", subdomain);
      formData.append("projectId", projectId);

      // Відправляємо запит
      await deployApi.sendRequest("post", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      
      // Встановлюємо флаг для обробки в useEffect
      setDeploymentRequested(true);
      
    } catch (err) {
      console.error("Deployment error:", err);
      setError(err.message || "Помилка розгортання сайту");
      showNotification(err.message || "Помилка розгортання сайту", "error");
      setDeploying(false);
    }
  };

  // useEffect для обробки результатів розгортання
  useEffect(() => {
    if (deploymentRequested && (deployApi.data || deployApi.error)) {
      if (deployApi.error) {
        setError(deployApi.error.message || "Помилка розгортання сайту");
        showNotification(deployApi.error.message || "Помилка розгортання сайту", "error");
        setDeploying(false);
        setDeploymentRequested(false);
        return;
      }

      // Отримуємо URL з відповіді
      if (deployApi.data && deployApi.data.url) {
        const siteUrl = deployApi.data.url;
        setDeploymentUrl(siteUrl);
        
        // Локально оновлюємо список deployments
        const existingIndex = deployments.findIndex(d => d.subdomain === subdomain);
        
        if (existingIndex >= 0) {
          // Оновлюємо існуючий запис
          const updatedDeployments = [...deployments];
          updatedDeployments[existingIndex] = {
            ...updatedDeployments[existingIndex],
            url: siteUrl,
            status: "active",
            deployed_at: new Date().toISOString()
          };
          setDeployments(updatedDeployments);
          showNotification("Сайт успішно оновлено!");
        } else {
          // Додаємо новий запис
          const newDeployment = {
            subdomain,
            url: siteUrl,
            status: "active", 
            deployed_at: new Date().toISOString()
          };
          setDeployments([newDeployment, ...deployments]);
          showNotification("Сайт успішно розгорнуто!");
        }
        
        // Оновлюємо з сервера
        refreshDeployments();
      } else {
        setError("Сервер не повернув URL розгорнутого сайту");
        showNotification("Сервер не повернув URL розгорнутого сайту", "error");
      }
      
      setDeploying(false);
      setDeploymentRequested(false);
    }
  }, [deployApi.data, deployApi.error, deploymentRequested]);

  // Функція призупинення сайту
  const handleSuspend = async (subdomain) => {
    if (!subdomain) return;

    try {
      // Позначаємо, що дія виконується для цього субдомену
      setActionInProgress(prev => ({ ...prev, [subdomain]: 'suspend' }));
      setSubdomainToSuspend(subdomain);
      setSuspendRequested(false);
      
      await suspendApi.sendRequest("post", {
        projectId,
        subdomain,
      });
      
      setSuspendRequested(true);
      
    } catch (err) {
      console.error("Suspend error:", err);
      setError(err.message || "Помилка призупинення сайту");
      showNotification(err.message || "Помилка призупинення сайту", "error");
      
      // Знімаємо позначку дії
      setActionInProgress(prev => {
        const updated = { ...prev };
        delete updated[subdomain];
        return updated;
      });
      setSubdomainToSuspend(null);
    }
  };

  // useEffect для обробки результатів призупинення
  useEffect(() => {
    if (suspendRequested && subdomainToSuspend && (suspendApi.data || suspendApi.error)) {
      if (suspendApi.error) {
        setError(suspendApi.error.message || "Помилка призупинення сайту");
        showNotification(suspendApi.error.message || "Помилка призупинення сайту", "error");
      } else {
        // Оновлюємо локальний стан
        const updatedDeployments = deployments.map(deployment => 
          deployment.subdomain === subdomainToSuspend 
            ? { ...deployment, status: 'suspended' } 
            : deployment
        );
        setDeployments(updatedDeployments);
        showNotification("Сайт успішно призупинено");
        
        // Також оновлюємо з сервера для впевненості
        refreshDeployments();
      }
      
      // Знімаємо позначку дії
      setActionInProgress(prev => {
        const updated = { ...prev };
        delete updated[subdomainToSuspend];
        return updated;
      });
      
      setSuspendRequested(false);
      setSubdomainToSuspend(null);
    }
  }, [suspendApi.data, suspendApi.error, suspendRequested, subdomainToSuspend]);

  // Функція відновлення сайту
  const handleResume = async (subdomain) => {
    if (!subdomain) return;

    try {
      // Позначаємо, що дія виконується для цього субдомену
      setActionInProgress(prev => ({ ...prev, [subdomain]: 'resume' }));
      setSubdomainToResume(subdomain);
      setResumeRequested(false);
      
      await resumeApi.sendRequest("post", {
        projectId,
        subdomain,
      });
      
      setResumeRequested(true);
      
    } catch (err) {
      console.error("Resume error:", err);
      setError(err.message || "Помилка відновлення сайту");
      showNotification(err.message || "Помилка відновлення сайту", "error");
      
      // Знімаємо позначку дії
      setActionInProgress(prev => {
        const updated = { ...prev };
        delete updated[subdomain];
        return updated;
      });
      setSubdomainToResume(null);
    }
  };

  // useEffect для обробки результатів відновлення
  useEffect(() => {
    if (resumeRequested && subdomainToResume && (resumeApi.data || resumeApi.error)) {
      if (resumeApi.error) {
        setError(resumeApi.error.message || "Помилка відновлення сайту");
        showNotification(resumeApi.error.message || "Помилка відновлення сайту", "error");
      } else {
        // Оновлюємо локальний стан
        const updatedDeployments = deployments.map(deployment => 
          deployment.subdomain === subdomainToResume 
            ? { ...deployment, status: 'active' } 
            : deployment
        );
        setDeployments(updatedDeployments);
        showNotification("Сайт успішно відновлено");
        
        // Також оновлюємо з сервера для впевненості
        refreshDeployments();
      }
      
      // Знімаємо позначку дії
      setActionInProgress(prev => {
        const updated = { ...prev };
        delete updated[subdomainToResume];
        return updated;
      });
      
      setResumeRequested(false);
      setSubdomainToResume(null);
    }
  }, [resumeApi.data, resumeApi.error, resumeRequested, subdomainToResume]);

  // Відкриття діалогу підтвердження видалення
  const openDeleteDialog = (deployment) => {
    setDeploymentToDelete(deployment);
    setDeleteDialogOpen(true);
  };

  // Закриття діалогу підтвердження видалення
  const closeDeleteDialog = () => {
    setDeleteDialogOpen(false);
    setDeploymentToDelete(null);
  };

  // Функція видалення сайту
  const handleDelete = async () => {
    if (!deploymentToDelete) return;
    
    const subdomain = deploymentToDelete.subdomain;

    try {
      // Позначаємо, що дія виконується для цього субдомену
      setActionInProgress(prev => ({ ...prev, [subdomain]: 'delete' }));
      
      // Закриваємо діалог
      setDeleteDialogOpen(false);
      
      // Зберігаємо субдомен для використання в useEffect
      setSubdomainToDelete(subdomain);
      setDeleteRequested(false);
      
      await deleteApi.sendRequest("delete", {
        projectId,
        subdomain,
      });
      
      // Встановлюємо флаг для обробки в useEffect
      setDeleteRequested(true);
      
    } catch (err) {
      console.error("Delete error:", err);
      setError(err.message || "Помилка видалення сайту");
      showNotification(err.message || "Помилка видалення сайту", "error");
      
      // Знімаємо позначку дії
      setActionInProgress(prev => {
        const updated = { ...prev };
        delete updated[subdomain];
        return updated;
      });
      
      setDeploymentToDelete(null);
      setSubdomainToDelete(null);
    }
  };

  // useEffect для обробки результатів видалення
  useEffect(() => {
    if (deleteRequested && subdomainToDelete && (deleteApi.data || deleteApi.error)) {
      if (deleteApi.error) {
        setError(deleteApi.error.message || "Помилка видалення сайту");
        showNotification(deleteApi.error.message || "Помилка видалення сайту", "error");
      } else if (deleteApi.data && (deleteApi.data.success === true || deleteApi.data === "delete")) {
        // Видаляємо сайт з локального стану
        const updatedDeployments = deployments.filter(
          (deployment) => deployment.subdomain !== subdomainToDelete
        );
        setDeployments(updatedDeployments);
        showNotification("Сайт успішно видалено");
        
        // Також оновлюємо з сервера для впевненості
        refreshDeployments();
      } else {
        setError("Сервер повернув неочікувану відповідь");
        showNotification("Сервер повернув неочікувану відповідь", "error");
      }
      
      // Знімаємо позначку дії
      setActionInProgress(prev => {
        const updated = { ...prev };
        delete updated[subdomainToDelete];
        return updated;
      });
      
      setDeleteRequested(false);
      setSubdomainToDelete(null);
      setDeploymentToDelete(null);
    }
  }, [deleteApi.data, deleteApi.error, deleteRequested, subdomainToDelete]);

  // Функція для оновлення існуючого сайту
  const handleUpdate = (subdomainToUpdate) => {
    // Встановлюємо поточний субдомен для оновлення
    setSubdomain(subdomainToUpdate);

    // Скролимо до форми розгортання
    document.getElementById("deployment-form")?.scrollIntoView({
      behavior: "smooth",
    });
  };

  // Функція для відображення статусу у зручному форматі
  const getStatusChip = (status) => {
    switch (status) {
      case "active":
        return <Chip 
          label="Активний" 
          color="success" 
          size="small"
          icon={<CheckCircle size={16} />}
        />;
      case "suspended":
        return <Chip 
          label="Призупинений" 
          color="warning" 
          size="small"
          icon={<Pause size={16} />}
        />;
      default:
        return <Chip 
          label={status || "Невідомо"} 
          color="default" 
          size="small" 
        />;
    }
  };

  return (
    <Box sx={{ width: "100%", maxWidth: 1200, mx: "auto", p: 2 }}>
      {/* Форма розгортання */}
      <Paper 
        elevation={3} 
        sx={{ p: 3, mb: 4 }}
        id="deployment-form"
      >
        <Typography variant="h5" component="h2" gutterBottom>
          Розгорнути ваш проєкт
        </Typography>

        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Субдомен"
              variant="outlined"
              value={subdomain}
              onChange={(e) => setSubdomain(e.target.value)}
              placeholder="ваш-сайт"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Typography variant="body2" color="text.secondary">
                      .yourdomain.com
                    </Typography>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleDeploy}
              disabled={!subdomain.trim() || deploying}
              startIcon={deploying ? <CircularProgress size={20} /> : <Upload size={20} />}
              fullWidth
              sx={{ height: '56px' }}
            >
              {deploying
                ? "Розгортання..."
                : deployments.some((d) => d.subdomain === subdomain)
                ? "Оновити сайт"
                : "Розгорнути сайт"}
            </Button>
          </Grid>
        </Grid>

        {error && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {error}
          </Alert>
        )}

        {deploymentUrl && (
          <Card sx={{ mt: 2, bgcolor: '#f0f7ff' }}>
            <CardContent>
              <Typography variant="subtitle1" gutterBottom>
                Ваш сайт успішно розгорнуто та доступний за адресою:
              </Typography>
              <Link
                href={deploymentUrl}
                target="_blank"
                rel="noopener noreferrer"
                sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  color: 'primary.main',
                  fontWeight: 'medium'
                }}
              >
                {deploymentUrl} <ExternalLink size={16} />
              </Link>
            </CardContent>
          </Card>
        )}
      </Paper>

      {/* Список розгорнутих сайтів */}
      <Paper elevation={3} sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h5" component="h2" gutterBottom sx={{ mb: 0 }}>
            Мої розгорнуті сайти
          </Typography>
          
          <Button
            variant="outlined"
            startIcon={<RefreshCw size={18} />}
            onClick={refreshDeployments}
            disabled={loading}
          >
            Оновити
          </Button>
        </Box>

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 3 }}>
            <CircularProgress />
          </Box>
        ) : deployments && deployments.length > 0 ? (
          <TableContainer component={Paper} elevation={0} variant="outlined">
            <Table sx={{ minWidth: 650 }}>
              <TableHead>
                <TableRow>
                  <TableCell>Субдомен</TableCell>
                  <TableCell>URL</TableCell>
                  <TableCell>Статус</TableCell>
                  <TableCell>Дата розгортання</TableCell>
                  <TableCell align="right">Дії</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {deployments.map((deployment) => (
                  <TableRow
                    key={deployment.subdomain}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      <Typography fontWeight="medium">
                        {deployment.subdomain}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Link
                        href={deployment.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{ display: 'flex', alignItems: 'center' }}
                      >
                        {deployment.url}
                        <ExternalLink size={16} className="ml-1" />
                      </Link>
                    </TableCell>
                    <TableCell>
                      {getStatusChip(deployment.status)}
                    </TableCell>
                    <TableCell>
                      {new Date(deployment.deployed_at).toLocaleString()}
                    </TableCell>
                    <TableCell align="right">
                      <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                        <Tooltip title="Оновити сайт">
                          <span>
                            <IconButton
                              color="primary"
                              onClick={() => handleUpdate(deployment.subdomain)}
                              disabled={!!actionInProgress[deployment.subdomain]}
                            >
                              <RefreshCcw size={18} />
                            </IconButton>
                          </span>
                        </Tooltip>

                        {deployment.status === "active" ? (
                          <Tooltip title="Призупинити сайт">
                            <span>
                              <IconButton
                                color="warning"
                                onClick={() => handleSuspend(deployment.subdomain)}
                                disabled={!!actionInProgress[deployment.subdomain]}
                              >
                                {actionInProgress[deployment.subdomain] === 'suspend' ? 
                                  <CircularProgress size={24} /> : <Pause size={18} />}
                              </IconButton>
                            </span>
                          </Tooltip>
                        ) : (
                          <Tooltip title="Відновити сайт">
                            <span>
                              <IconButton
                                color="success"
                                onClick={() => handleResume(deployment.subdomain)}
                                disabled={!!actionInProgress[deployment.subdomain]}
                              >
                                {actionInProgress[deployment.subdomain] === 'resume' ? 
                                  <CircularProgress size={24} /> : <Play size={18} />}
                              </IconButton>
                            </span>
                          </Tooltip>
                        )}

                        <Tooltip title="Видалити сайт">
                          <span>
                            <IconButton
                              color="error"
                              onClick={() => openDeleteDialog(deployment)}
                              disabled={!!actionInProgress[deployment.subdomain]}
                            >
                              {actionInProgress[deployment.subdomain] === 'delete' ? 
                                <CircularProgress size={24} /> : <Trash2 size={18} />}
                            </IconButton>
                          </span>
                        </Tooltip>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Paper 
            variant="outlined" 
            sx={{ p: 3, textAlign: "center", bgcolor: "#f8f9fa" }}
          >
            <Typography variant="body1" color="textSecondary">
              У вас ще немає розгорнутих сайтів.
            </Typography>
            <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
              Використовуйте форму вище, щоб розгорнути ваш перший сайт.
            </Typography>
          </Paper>
        )}
      </Paper>

      {/* Діалог підтвердження видалення */}
      <Dialog
        open={deleteDialogOpen}
        onClose={closeDeleteDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Підтвердження видалення сайту
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Ви впевнені, що хочете видалити сайт з субдоменом{" "}
            <strong>{deploymentToDelete?.subdomain}</strong>?
            <br />
            Це дія безповоротна, і всі дані сайту будуть видалені.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDeleteDialog} color="primary">
            Скасувати
          </Button>
          <Button
            onClick={handleDelete}
            color="error"
            variant="contained"
            startIcon={<Trash2 size={18} />}
            autoFocus
          >
            Видалити
          </Button>
        </DialogActions>
      </Dialog>

      {/* Сповіщення */}
      <Snackbar
        open={notification.open}
        autoHideDuration={4000}
        onClose={closeNotification}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert 
          onClose={closeNotification} 
          severity={notification.severity} 
          sx={{ width: '100%' }}
          icon={notification.severity === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default DeploymentPanel;