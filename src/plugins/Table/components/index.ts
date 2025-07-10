
import TableHead from "./TableHead";
import TableFooter from "./TableFooter";
import TableCell from "./TableCell";
import TableBody from "./TableBody";
import Table from "./Table";

export default (editor, config = {}) => {
  const domc = editor.DomComponents;
  (config as any).modal = editor.Modal;

  TableFooter(domc, config);
  TableHead(domc, config);
  TableBody(domc, config);
  Table(domc, config as any);
  TableCell(domc, config);
};