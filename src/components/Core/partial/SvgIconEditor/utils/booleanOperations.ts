import paper from 'paper';
import { v4 as uuidv4 } from 'uuid';
import { PathElement, Point, Transform } from "./types";
import { generatePathData } from "./pathGenerators"; 
import { getElementCenter } from '.';

// Ініціалізуємо paper.js один раз при імпорті
const canvas = document.createElement('canvas');
paper.setup(canvas);

// Додаємо типи paper.js
interface PaperPath extends paper.Path {
    unite(path: paper.Path): paper.PathItem;
    intersect(path: paper.Path): paper.PathItem;
    subtract(path: paper.Path): paper.PathItem;
    exclude(path: paper.Path): paper.PathItem;
    divide(path: paper.Path): paper.PathItem;
    divide_blob(path: paper.Path): paper.PathItem;
    curves: PaperCurve[];
}
interface PaperCurve {
    getLocationAt(offset: number): { index: number };
    getPointAt(offset: number): paper.Point;
    length: number;
}
 
// Конвертує наш PathElement в path paper.js
const convertToPaperPath = (element: PathElement): PaperPath => {
    const pathData = generatePathData(element);
    const path = new paper.Path(pathData) as PaperPath;
    
    // Для кола і еліпса створюємо спеціальний path з урахуванням трансформацій
    if (element.type === 'circle' || element.type === 'ellipse') {
        const [centerPoint] = element.points;
        
        // Створюємо точку центру з урахуванням трансформації
        const transformedCenter = new paper.Point(
            centerPoint.x + (element.transform?.translate?.x || 0),
            centerPoint.y + (element.transform?.translate?.y || 0)
        );
        
        if (element.type === 'circle') {
            // Для кола враховуємо масштаб при обчисленні радіусу
            const baseRadius = Math.hypot(
                element.points[1].x - centerPoint.x,
                element.points[1].y - centerPoint.y
            );
            
            // Враховуємо масштаб для радіусу
            const scaleX = element.transform?.scale?.x || 1;
            const scaleY = element.transform?.scale?.y || 1;
            const radius = baseRadius * Math.max(scaleX, scaleY);

            const circlePath = new paper.Path.Circle(
                transformedCenter,
                radius
            ) as paper.Path;

            // Копіюємо стилі
            circlePath.strokeColor = path.strokeColor;
            circlePath.strokeWidth = path.strokeWidth;
            circlePath.fillColor = path.fillColor;

            // Застосовуємо поворот окремо
            if (element.transform?.rotate) {
                const rotationMatrix = new paper.Matrix();
                rotationMatrix.rotate(element.transform.rotate, transformedCenter);
                circlePath.transform(rotationMatrix);
            }

            path.remove();
            return circlePath as PaperPath;
        } 
        else if (element.type === 'ellipse') {
            // Для еліпса враховуємо окремо масштаб по X та Y
            const radiusX = Math.abs(element.points[1].x - centerPoint.x) * (element.transform?.scale?.x || 1);
            const radiusY = Math.abs(element.points[1].y - centerPoint.y) * (element.transform?.scale?.y || 1);

            const ellipsePath = new paper.Path.Ellipse({
                center: transformedCenter,
                radius: [radiusX, radiusY]
            }) as paper.Path;

            // Копіюємо стилі
            ellipsePath.strokeColor = path.strokeColor;
            ellipsePath.strokeWidth = path.strokeWidth;
            ellipsePath.fillColor = path.fillColor;

            // Застосовуємо поворот окремо
            if (element.transform?.rotate) {
                const rotationMatrix = new paper.Matrix();
                rotationMatrix.rotate(element.transform.rotate, transformedCenter);
                ellipsePath.transform(rotationMatrix);
            }

            path.remove();
            return ellipsePath as PaperPath;
        }
    }
    
    // Для інших фігур залишаємо стару логіку
    const center = getElementCenter(element);
    const matrix = new paper.Matrix();
    
    matrix.translate(new paper.Point(center.x, center.y));
    matrix.rotate(element.transform?.rotate || 0, new paper.Point(0, 0));
    matrix.scale(
        element.transform?.scale?.x || 1, 
        element.transform?.scale?.y || 1,
        new paper.Point(0, 0)
    );
    matrix.translate(new paper.Point(-center.x, -center.y));
    matrix.translate(new paper.Point(
        element.transform?.translate?.x || 0,
        element.transform?.translate?.y || 0
    ));
    
    path.transform(matrix);
    return path as PaperPath;
};

// Конвертує paper.js path в PathElement, зберігаючи SVG path дані
const convertToPathElement = (
    paperPath: paper.PathItem, 
    originalStyle: PathElement['style']
): PathElement => {
    // Отримуємо SVG path дані
    let pathData = '';
    if (paperPath instanceof paper.CompoundPath) {
        pathData = paperPath.children.map(child => child.pathData).join(' ');
    } else {
        pathData = paperPath.pathData;
    }

    // Створюємо points з основних точок path
    const points = paperPath.segments ? 
        paperPath.segments.map(segment => ({
            x: segment.point.x,
            y: segment.point.y
        })) :
        paperPath instanceof paper.CompoundPath ?
            paperPath.children[0].segments.map(segment => ({
                x: segment.point.x,
                y: segment.point.y
            })) : [];

    return {
        id: uuidv4(),
        type: 'path',  // Змінюємо тип на 'path'
        points: points,
        style: { ...originalStyle },
        transform: {
            translate: { x: 0, y: 0 },
            rotate: 0,
            scale: { x: 1, y: 1 }
        },
        isVisible: true,
        data: {
            pathData: pathData  // Зберігаємо SVG path дані
        }
    };
};

export const unionElements = (element1: PathElement, element2: PathElement): PathElement => {
    try {
        console.log("Starting union operation");

        const path1 = convertToPaperPath(element1);
        const path2 = convertToPaperPath(element2);

        console.log("Paths created:", path1, path2);

        const result = path1.unite(path2);
        console.log("Union result:", result);

        const resultElement = convertToPathElement(result, element1.style || {
            strokeColor: '#000000',
            strokeWidth: 2,
            strokeOpacity: 1,
            fillColor: '#ffffff',
            fill: false,
            fillOpacity: 1
        });

        console.log("Final result element:", resultElement);

        path1.remove();
        path2.remove();
        result.remove();

        return resultElement;
    } catch (error) {
        console.error("Error in unionElements:", error);
        throw error;
    }
};

export const subtractElements = (element1: PathElement, element2: PathElement): PathElement => {
    try {
        console.log("Starting subtract operation");

        const path1 = convertToPaperPath(element1);
        const path2 = convertToPaperPath(element2);

        console.log("Paths created:", path1, path2);

        const result = path1.subtract(path2);
        console.log("Subtract result:", result);

        const resultElement = convertToPathElement(result, element1.style || {
            strokeColor: '#000000',
            strokeWidth: 2,
            strokeOpacity: 1,
            fillColor: '#ffffff',
            fill: false,
            fillOpacity: 1
        });

        console.log("Final result element:", resultElement);

        path1.remove();
        path2.remove();
        result.remove();

        return resultElement;
    } catch (error) {
        console.error("Error in subtractElements:", error);
        throw error;
    }
};

export const intersectElements = (element1: PathElement, element2: PathElement): PathElement => {
    try {
        console.log("Starting intersect operation");
        
        const path1 = convertToPaperPath(element1);
        const path2 = convertToPaperPath(element2);
        
        console.log("Paths created:", path1, path2);

        const result = path1.intersect(path2);
        console.log("Intersect result:", result);

        const resultElement = convertToPathElement(result, {
            ...element1.style,
            fill: true, // Для перетину краще включити заливку
            fillOpacity: 0.8
        });

        console.log("Final result element:", resultElement);

        path1.remove();
        path2.remove();
        result.remove();

        return resultElement;
    } catch (error) {
        console.error("Error in intersectElements:", error);
        throw error;
    }
};

export const excludeElements = (element1: PathElement, element2: PathElement): PathElement => {
    try {
        console.log("Starting exclude operation");
        
        const path1 = convertToPaperPath(element1);
        const path2 = convertToPaperPath(element2);
        
        const result = path1.exclude(path2);

        const resultElement = convertToPathElement(result, element1.style);

        path1.remove();
        path2.remove();
        result.remove();

        return resultElement;
    } catch (error) {
        console.error("Error in excludeElements:", error);
        throw error;
    }
};

export const divideElements = (element1: PathElement, element2: PathElement): PathElement[] => {
    try {
        console.log("Starting divide operation");
        
        const path1 = convertToPaperPath(element1);
        const path2 = convertToPaperPath(element2);
        
        // Створюємо всі можливі частини
        const intersection = path1.intersect(path2);
        const subtract1 = path1.subtract(path2);
        const subtract2 = path2.subtract(path1);

        // Конвертуємо кожну частину в PathElement
        const results: PathElement[] = [];

        if (intersection.segments?.length > 0) {
            results.push(convertToPathElement(intersection, {
                ...element1.style,
                fillColor: '#4A90E2', // Синій для перетину
                fill: true,
                fillOpacity: 0.8
            }));
        }

        if (subtract1.segments?.length > 0) {
            results.push(convertToPathElement(subtract1, {
                ...element1.style,
                fillColor: '#E24A4A', // Червоний для першої різниці
                fill: true,
                fillOpacity: 0.8
            }));
        }

        if (subtract2.segments?.length > 0) {
            results.push(convertToPathElement(subtract2, {
                ...element2.style,
                fillColor: '#4AE24A', // Зелений для другої різниці
                fill: true,
                fillOpacity: 0.8
            }));
        }

        // Очищення
        path1.remove();
        path2.remove();
        intersection.remove();
        subtract1.remove();
        subtract2.remove();

        return results;
    } catch (error) {
        console.error("Error in divideElements:", error);
        throw error;
    }
};

const convertToPaperPathBlob = (element: PathElement): paper.Path => {
    let path: paper.Path;

    if (element.type === 'circle') {
        const [center] = element.points;
        const radius = Math.hypot(
            element.points[1].x - center.x,
            element.points[1].y - center.y
        );

        // Створюємо коло з більшою кількістю сегментів для гладкості
        path = new paper.Path.Circle({
            center: new paper.Point(center.x, center.y),
            radius: radius,
            strokeColor: element.style?.strokeColor || '#000000',
            strokeWidth: element.style?.strokeWidth || 1,
            fillColor: element.style?.fill ? element.style.fillColor : undefined,
            // Важливі параметри для кращої якості
            clockwise: true,
            insert: true
        });
    } else {
        // Для інших фігур використовуємо стандартний підхід
        path = new paper.Path(generatePathData(element));
        path.strokeColor = new paper.Color(element.style?.strokeColor || '#000000');
        path.strokeWidth = element.style?.strokeWidth || 1;
        if (element.style?.fill) {
            path.fillColor = new paper.Color(element.style.fillColor);
        }
    }

    // Застосовуємо трансформації
    if (element.transform) {
        const center = getElementCenter(element);
        const matrix = new paper.Matrix();

        if (element.transform.translate.x !== 0 || element.transform.translate.y !== 0) {
            matrix.translate(new paper.Point(element.transform.translate.x, element.transform.translate.y));
        }

        if (element.transform.rotate !== 0) {
            matrix.rotate(element.transform.rotate, new paper.Point(center.x, center.y));
        }

        if (element.transform.scale.x !== 1 || element.transform.scale.y !== 1) {
            matrix.scale(
                element.transform.scale.x,
                element.transform.scale.y,
                new paper.Point(center.x, center.y)
            );
        }

        path.transform(matrix);
    }

    return path;
};

export const divideElementsBlob = (element1: PathElement, element2: PathElement): PathElement[] => {
    try {
        const path1 = convertToPaperPathBlob(element1);
        const path2 = convertToPaperPathBlob(element2);

        // Створюємо всі частини одночасно для кращої точності
        const intersection = path1.intersect(path2, { insert: false });
        const subtract1 = path1.subtract(path2, { insert: false });
        const subtract2 = path2.subtract(path1, { insert: false });

        const results: PathElement[] = [];

        // Обробляємо кожну частину
        [
            { path: subtract1, color: '#ff0000', opacity: 0.5 },
            { path: intersection, color: '#0000ff', opacity: 0.5 },
            { path: subtract2, color: '#00ff00', opacity: 0.5 }
        ].forEach(({ path, color, opacity }) => {
            if (path && path.segments && path.segments.length > 0) {
                path.reduce();
                path.simplify(0.01);

                results.push(convertToPathElement(path, {
                    ...element1.style,
                    fill: true,
                    fillColor: color,
                    fillOpacity: opacity,
                    strokeColor: element1.style?.strokeColor || '#000000',
                    strokeWidth: element1.style?.strokeWidth || 1
                }));
            }
            path.remove();
        });

        // Очищення
        path1.remove();
        path2.remove();

        return results;
    } catch (error) {
        console.error("Error in divideElements:", error);
        throw error;
    }
};