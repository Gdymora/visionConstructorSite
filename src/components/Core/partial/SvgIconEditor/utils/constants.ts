export const TOOLS = {
    CURSOR: 'cursor' as const,
    LINE: 'line' as const,
    RECT: 'rect' as const,
    CIRCLE: 'circle' as const,
    ELLIPSE: 'ellipse' as const,
    POLYGON: 'polygon' as const,
    STAR: 'star' as const,
    CURVE: 'curve' as const,
    PENCIL: 'pencil' as const,
    POINTSHAPE: 'pointShape' as const,
    ROUNDED_RECT:'roundedRect' as const,
    ARC_LEFT:'arc_left' as const,
    ARC_RIGHT:'arc_right' as const,
    PATH: 'path' as const
  } as const;
  
  export const DRAWING_TOOLS = {
    LINE: TOOLS.LINE,
    RECT: TOOLS.RECT,
    CIRCLE: TOOLS.CIRCLE,
    ELLIPSE: TOOLS.ELLIPSE,
    POLYGON: TOOLS.POLYGON,
    STAR: TOOLS.STAR,
    CURVE: TOOLS.CURVE,
    PENCIL: TOOLS.PENCIL,
    POINTSHAPE: TOOLS.POINTSHAPE,
    PATH: TOOLS.PATH
  } as const;
  
  /* // в коді можна використовувати:
  if (activeTool === TOOLS.CURSOR) {
    // ...
  } */