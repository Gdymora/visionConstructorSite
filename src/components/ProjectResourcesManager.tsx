import { useState, useEffect, useRef } from "react";
import {
  Paper,
  Typography,
  Box,
  MenuItem,
  Select,
  TextField,
  Button,
  Switch,
  Alert,
  FormControl,
  InputLabel,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
} from "@mui/material";
import { Plus, Trash2, ArrowUp, ArrowDown, Edit, X } from "lucide-react";
import useAxios from "../Hooks/useAxios";
import ResourcesService from "../services/ResourcesService";

const apiUrl = process.env.REACT_APP_API_URL;

const ProjectResourcesManager = ({ projectId }) => {
  // State
  const [resources, setResources] = useState([]);
  const [newResource, setNewResource] = useState({
    type: "style",
    url: "",
    priority: 0,
    is_active: true,
  });
  const [editingResource, setEditingResource] = useState(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [resourceToDelete, setResourceToDelete] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);
  
  // Відстеження ресурсів, що зараз оновлюються (щоб не блокувати всі елементи)
  const [updatingResourceIds, setUpdatingResourceIds] = useState(new Set());

  // Створюємо REF для відстеження чи вже був зроблений запит
  const initialFetchDoneRef = useRef(false);
  const actionsInProgressRef = useRef(false);

  // API хуки
  const resourcesApiUrl = `${apiUrl}/projects/${projectId}/resources`;
  const resourcesApi = useAxios(resourcesApiUrl);
  // Створення нового хука для дій, щоб уникнути конфліктів з основним запитом
  const actionApi = useAxios(resourcesApiUrl);
  
  // Отримання редактора
  const editor = (window as any).editor;

  // Завантаження ресурсів при першому рендері або зміні projectId
  useEffect(() => {
    // Скидаємо прапорець при зміні projectId
    if (projectId && !initialFetchDoneRef.current && !actionsInProgressRef.current) {
      fetchResources();
    }
    
    // Функція очищення при розмонтуванні
    return () => {
      initialFetchDoneRef.current = false;
    };
  }, [projectId]);

  // Функція для отримання ресурсів з API
  const fetchResources = async () => {
    if (!projectId || actionsInProgressRef.current) return;
    
    try {
      actionsInProgressRef.current = true;
      await resourcesApi.sendRequest("get");
      initialFetchDoneRef.current = true;
    } catch (error) {
      console.error("Помилка отримання ресурсів:", error);
    } finally {
      actionsInProgressRef.current = false;
    }
  };

  // Оновлення локального стану при отриманні даних від API
  useEffect(() => {
    if (resourcesApi.data) {
      setResources(resourcesApi.data.sort((a, b) => a.priority - b.priority));
    }
  }, [resourcesApi.data]);

  // Обробник додавання нового ресурсу
  const handleAddResource = async () => {
    if (!newResource.url || !projectId || isUpdating) return;
  
    // Знаходимо максимальний пріоритет
    const maxPriority = resources.length > 0 
      ? Math.max(...resources.map(r => r.priority))
      : -1;
  
    const resourceToAdd = {
      ...newResource,
      priority: maxPriority + 1
    };
  
    try {
      setIsUpdating(true);
      await actionApi.sendRequest("post", resourceToAdd);
  
      if (!actionApi.error && actionApi.data) {
        // Додаємо ресурс до редактора
        if (editor) {
          ResourcesService.addResource(editor, actionApi.data);
        }
        
        // Оновлюємо список ресурсів локально 
        setResources(prev => [...prev, actionApi.data].sort((a, b) => a.priority - b.priority));
        
        // Скидаємо форму
        setNewResource({ 
          type: "style", 
          url: "", 
          priority: 0, 
          is_active: true 
        });
      }
    } catch (error) {
      console.error("Помилка додавання ресурсу:", error);
    } finally {
      setIsUpdating(false);
    }
  };
  
  // Основний метод оновлення ресурсу, з правильним оновленням інтерфейсу
  const handleUpdateResource = async (resourceId, updates) => {
    if (!resourceId || !projectId) return;
    
    // Додаємо ресурс до списку оновлюваних
    setUpdatingResourceIds(prev => {
      const newSet = new Set(prev);
      newSet.add(resourceId);
      return newSet;
    });
    
    // Якщо оновлюємо активність, одразу оновлюємо UI
    if ('is_active' in updates) {
      // Оптимістично оновлюємо UI
      setResources(prev => 
        prev.map(resource => 
          resource.id === resourceId
            ? { ...resource, is_active: updates.is_active } 
            : resource
        )
      );
      
      // Оновлюємо стан в редакторі
      if (editor) {
        ResourcesService.updateResourceState(
          editor,
          resourceId,
          updates.is_active
        );
      }
    }
    
    // Відправляємо запит до API
    try {
      const resourceUrl = `${apiUrl}/projects/${projectId}/resources/${resourceId}`;
      await actionApi.sendRequest("patch", updates, {}, resourceUrl);
      
      // Якщо успішно оновили - оновлюємо локальний стан з серверними даними
      if (!actionApi.error && actionApi.data) {
        // Оновлюємо локальний стан з отриманими даними від сервера
        setResources(prev =>
          prev.map(resource =>
            resource.id === resourceId
              ? { ...resource, ...actionApi.data }
              : resource
          )
        );
        
        // Закриваємо діалог редагування, якщо це оновлення з діалогу
        if (updates.type || updates.url) {
          setIsEditDialogOpen(false);
        }
      } else if (actionApi.error && 'is_active' in updates) {
        // Якщо помилка і це зміна активності - повертаємо початковий стан
        console.error("Помилка зміни активності, повертаємо початковий стан");
        
        // Відновлюємо попередній стан
        setResources(prev => 
          prev.map(resource => 
            resource.id === resourceId
              ? { ...resource, is_active: !updates.is_active } 
              : resource
          )
        );
        
        // Відновлюємо стан в редакторі
        if (editor) {
          ResourcesService.updateResourceState(
            editor,
            resourceId,
            !updates.is_active
          );
        }
      }
    } catch (error) {
      console.error("Помилка оновлення ресурсу:", error);
      
      // Якщо помилка мережі і це зміна активності - повертаємо початковий стан
      if ('is_active' in updates) {
        // Відновлюємо попередній стан
        setResources(prev => 
          prev.map(resource => 
            resource.id === resourceId
              ? { ...resource, is_active: !updates.is_active } 
              : resource
          )
        );
        
        // Відновлюємо стан в редакторі
        if (editor) {
          ResourcesService.updateResourceState(
            editor,
            resourceId,
            !updates.is_active
          );
        }
      }
    } finally {
      // Видаляємо ресурс зі списку оновлюваних
      setUpdatingResourceIds(prev => {
        const newSet = new Set(prev);
        newSet.delete(resourceId);
        return newSet;
      });
    }
  };

  // Обробник зміни стану перемикача - прямий доступ
  const handleSwitchChange = (event, resourceId) => {
    // Отримуємо нове значення перемикача
    const isActive = event.target.checked;
    // Викликаємо оновлення ресурсу
    handleUpdateResource(resourceId, { is_active: isActive });
  };

  // Обробник зміни пріоритету
  const handlePriorityChange = async (resourceId, direction) => {
    if (!resourceId || !projectId || isUpdating) return;
    
    const currentIndex = resources.findIndex(r => r.id === resourceId);
    if (currentIndex === -1) return;
    
    const resource = resources[currentIndex];
    let swapIndex;
    
    if (direction === "up" && currentIndex > 0) {
      swapIndex = currentIndex - 1;
    } else if (direction === "down" && currentIndex < resources.length - 1) {
      swapIndex = currentIndex + 1;
    } else {
      return; // Неможливо змінити пріоритет
    }
    
    const swapResource = resources[swapIndex];
    
    try {
      setIsUpdating(true);
      
      // Оновлюємо перший ресурс
      const firstResourceUrl = `${apiUrl}/projects/${projectId}/resources/${resource.id}`;
      await actionApi.sendRequest(
        "patch",
        { priority: swapResource.priority },
        {},
        firstResourceUrl
      );

      // Оновлюємо другий ресурс
      const secondResourceUrl = `${apiUrl}/projects/${projectId}/resources/${swapResource.id}`;
      await actionApi.sendRequest(
        "patch",
        { priority: resource.priority },
        {},
        secondResourceUrl
      );

      // Оновлюємо локальний стан
      setResources(prev => {
        const updated = [...prev];
        updated[currentIndex] = { ...resource, priority: swapResource.priority };
        updated[swapIndex] = { ...swapResource, priority: resource.priority };
        return updated.sort((a, b) => a.priority - b.priority);
      });
    } catch (error) {
      console.error("Помилка зміни пріоритету:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  // Обробник видалення ресурсу
  const handleDeleteResource = async (resourceId) => {
    if (!resourceId || !projectId || isUpdating) return;
    
    try {
      setIsUpdating(true);
      const resourceUrl = `${apiUrl}/projects/${projectId}/resources/${resourceId}`;
      await actionApi.sendRequest("delete", {}, {}, resourceUrl);

      if (actionApi.data === "delete" || !actionApi.error) {
        // Видаляємо ресурс з редактора
        if (editor) {
          ResourcesService.removeResource(editor, resourceId);
        }

        // Оновлюємо локальний стан і перераховуємо пріоритети
        const resourcesWithoutDeleted = resources.filter(r => r.id !== resourceId);
        const updatedResources = resourcesWithoutDeleted.map((resource, index) => ({
          ...resource,
          priority: index
        }));
        
        setResources(updatedResources.sort((a, b) => a.priority - b.priority));
        
        // Оновлюємо пріоритети на сервері
        for (let i = 0; i < updatedResources.length; i++) {
          const resource = updatedResources[i];
          if (resource.priority !== i) {
            const priorityUrl = `${apiUrl}/projects/${projectId}/resources/${resource.id}`;
            await actionApi.sendRequest("patch", { priority: i }, {}, priorityUrl);
          }
        }

        setIsDeleteDialogOpen(false);
        setResourceToDelete(null);
      }
    } catch (error) {
      console.error("Помилка видалення ресурсу:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  // Функції для роботи з діалогами
  const openEditDialog = (resource) => {
    setEditingResource({ ...resource });
    setIsEditDialogOpen(true);
  };

  const openDeleteDialog = (resource) => {
    setResourceToDelete(resource);
    setIsDeleteDialogOpen(true);
  };

  // Функція для отримання заголовка типу ресурсу
  const getResourceTypeLabel = (type) => {
    switch (type) {
      case "style": return "CSS";
      case "script": return "JavaScript";
      case "font": return "Шрифт";
      default: return type;
    }
  };

  // Обробники форми
  const handleNewResourceTypeChange = (e) => {
    setNewResource(prev => ({ ...prev, type: e.target.value }));
  };

  const handleNewResourceUrlChange = (e) => {
    setNewResource(prev => ({ ...prev, url: e.target.value }));
  };

  const handleEditingResourceTypeChange = (e) => {
    setEditingResource(prev => prev ? { ...prev, type: e.target.value } : null);
  };

  const handleEditingResourceUrlChange = (e) => {
    setEditingResource(prev => prev ? { ...prev, url: e.target.value } : null);
  };

  // Перевірка чи ресурс зараз оновлюється
  const isResourceUpdating = (resourceId) => {
    return updatingResourceIds.has(resourceId);
  };

  // Відображення індикатора завантаження
  if (resourcesApi.loading && !isUpdating && resources.length === 0) {
    return (
      <Box display="flex" justifyContent="center" p={4}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      <Paper elevation={2} sx={{ width: "100%", maxWidth: 900 }}>
        <Box p={3}>
          <Typography variant="h6" gutterBottom>
            Зовнішні ресурси проекту ({resources.length})
          </Typography>

          {(resourcesApi.error || actionApi.error) && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {resourcesApi.error?.message ||
                actionApi.error?.message ||
                "Сталася помилка"}
            </Alert>
          )}

          <Box sx={{ display: "flex", gap: 2, mb: 4 }}>
            <FormControl sx={{ width: 150 }}>
              <InputLabel>Тип ресурсу</InputLabel>
              <Select
                value={newResource.type}
                label="Тип ресурсу"
                onChange={handleNewResourceTypeChange}
                disabled={isUpdating}
              >
                <MenuItem value="style">CSS</MenuItem>
                <MenuItem value="script">JavaScript</MenuItem>
                <MenuItem value="font">Шрифт</MenuItem>
              </Select>
            </FormControl>

            <TextField
              fullWidth
              label="URL ресурсу"
              type="url"
              value={newResource.url}
              onChange={handleNewResourceUrlChange}
              variant="outlined"
              disabled={isUpdating}
            />

            <Button
              variant="contained"
              onClick={handleAddResource}
              disabled={isUpdating || !newResource.url}
              sx={{
                display: "flex",
                gap: 1,
                alignItems: "center",
                whiteSpace: "nowrap",
              }}
            >
              {isUpdating ? (
                <CircularProgress size={20} />
              ) : (
                <Plus size={20} />
              )}
              Додати
            </Button>
          </Box>

          {resources.length > 0 ? (
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              {resources.map((resource) => (
                <Paper
                  key={resource.id}
                  variant="outlined"
                  sx={{
                    p: 2,
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    bgcolor: "background.default",
                  }}
                >
                  <Typography
                    sx={{ width: 100 }}
                    variant="body2"
                    color="textSecondary"
                  >
                    {getResourceTypeLabel(resource.type)}
                  </Typography>

                  <Typography
                    variant="body2"
                    sx={{
                      flex: 1,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {resource.url}
                  </Typography>

                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Button
                      size="small"
                      onClick={() => handlePriorityChange(resource.id, "up")}
                      disabled={
                        resource.priority === 0 || 
                        isUpdating || 
                        isResourceUpdating(resource.id)
                      }
                      sx={{ minWidth: "auto", p: 1 }}
                    >
                      <ArrowUp size={18} />
                    </Button>

                    <Button
                      size="small"
                      onClick={() => handlePriorityChange(resource.id, "down")}
                      disabled={
                        resource.priority === resources.length - 1 || 
                        isUpdating ||
                        isResourceUpdating(resource.id)
                      }
                      sx={{ minWidth: "auto", p: 1 }}
                    >
                      <ArrowDown size={18} />
                    </Button>

                    <Switch
                      checked={resource.is_active}
                      onChange={(e) => handleSwitchChange(e, resource.id)}
                      disabled={isUpdating || isResourceUpdating(resource.id)}
                      size="small"
                    />

                    <Button
                      size="small"
                      onClick={() => openEditDialog(resource)}
                      disabled={isUpdating || isResourceUpdating(resource.id)}
                      sx={{ minWidth: "auto", p: 1 }}
                    >
                      <Edit size={18} />
                    </Button>

                    <Button
                      size="small"
                      onClick={() => openDeleteDialog(resource)}
                      disabled={isUpdating || isResourceUpdating(resource.id)}
                      color="error"
                      sx={{ minWidth: "auto", p: 1 }}
                    >
                      <Trash2 size={18} />
                    </Button>
                  </Box>
                </Paper>
              ))}
            </Box>
          ) : (
            <Typography
              variant="body2"
              color="textSecondary"
              sx={{ textAlign: "center", py: 4 }}
            >
              Немає доданих ресурсів
            </Typography>
          )}
        </Box>
      </Paper>

      {/* Діалог редагування */}
      <Dialog
        open={isEditDialogOpen}
        onClose={() => !isUpdating && setIsEditDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ m: 0, p: 2 }}>
          Редагування ресурсу
          <IconButton
            aria-label="close"
            onClick={() => !isUpdating && setIsEditDialogOpen(false)}
            sx={{ position: "absolute", right: 8, top: 8 }}
            disabled={isUpdating}
          >
            <X size={20} />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          {editingResource && (
            <Box
              sx={{ display: "flex", flexDirection: "column", gap: 2, pt: 1 }}
            >
              <FormControl fullWidth>
                <InputLabel>Тип ресурсу</InputLabel>
                <Select
                  value={editingResource.type}
                  label="Тип ресурсу"
                  onChange={handleEditingResourceTypeChange}
                  disabled={isUpdating}
                >
                  <MenuItem value="style">CSS</MenuItem>
                  <MenuItem value="script">JavaScript</MenuItem>
                  <MenuItem value="font">Шрифт</MenuItem>
                </Select>
              </FormControl>

              <TextField
                fullWidth
                label="URL ресурсу"
                type="url"
                value={editingResource.url}
                onChange={handleEditingResourceUrlChange}
                variant="outlined"
                disabled={isUpdating}
              />
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={() => setIsEditDialogOpen(false)}
            disabled={isUpdating}
          >
            Скасувати
          </Button>
          <Button
            variant="contained"
            onClick={() =>
              handleUpdateResource(editingResource.id, {
                type: editingResource.type,
                url: editingResource.url,
              })
            }
            disabled={
              isUpdating || 
              !editingResource?.url
            }
          >
            {isUpdating ? <CircularProgress size={20} /> : "Зберегти"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Діалог підтвердження видалення */}
      <Dialog
        open={isDeleteDialogOpen}
        onClose={() => !isUpdating && setIsDeleteDialogOpen(false)}
      >
        <DialogTitle>Підтвердження видалення</DialogTitle>
        <DialogContent>
          <Typography>
            Ви дійсно хочете видалити цей ресурс?
            <br />
            {resourceToDelete?.url}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={() => setIsDeleteDialogOpen(false)}
            disabled={isUpdating}
          >
            Скасувати
          </Button>
          <Button
            color="error"
            variant="contained"
            onClick={() => handleDeleteResource(resourceToDelete?.id)}
            disabled={isUpdating}
          >
            {isUpdating ? <CircularProgress size={20} /> : "Видалити"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ProjectResourcesManager;