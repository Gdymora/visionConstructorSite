// commonTraits.js
export const commonTraits = [
    // changeProp: true  Або false, залежно від того, чи мають ці зміни впливати на властивості компонента
    // changeProp: true буде вказано в json як окреме поле
    { type: 'text', label: 'ID', name: 'id', changeProp: true },
    { type: "text", label: "Text", name: "content", changeProp: true },
    // буде вказано в json у властивості attribute 
    { type: "text", label: "Data Attribute Value", name: "value" },
    { type: "text", label: "Data Attribute Name", name: "name" },
    { type: "text", label: "Name", name: "name" },
    { type: "text", label: "Value", name: "value" },
    // Використовуємо class_select для управління класами 
];
