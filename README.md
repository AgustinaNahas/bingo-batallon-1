# Bingo Batallón 1 - Exploradores Argentinos de Don Bosco

Aplicación web para organizar y jugar partidas de bingo del Batallón 1 Pablo César Barton de Exploradores Argentinos de Don Bosco.

## Características

- **Grilla interactiva**: Números del 1 al 100 con botones clickeables
- **Seguimiento de números**: Lista de los últimos 5 números seleccionados
- **Sistema de premios**: Configuración de premios para cada partida
- **Persistencia**: Guardado automático en localStorage
- **Modales de celebración**: Pantallas completas para LÍNEA y BINGO
- **Diseño responsivo**: Adaptado a diferentes tamaños de pantalla

## Tecnologías

- **Next.js 15**: Framework de React
- **Tailwind CSS**: Estilos y diseño
- **localStorage**: Persistencia de datos
- **GitHub Pages**: Despliegue automático

## Uso

1. **Seleccionar números**: Haz clic en los números de la grilla para marcarlos
2. **Ver historial**: Los últimos 5 números aparecen en el panel lateral
3. **Configurar premio**: Al reiniciar, ingresa el premio para la nueva partida
4. **Celebrar victorias**: Usa los botones LÍNEA y BINGO para celebrar

## Despliegue

La aplicación se despliega automáticamente en GitHub Pages en cada push a la rama main.

**URL**: https://agustinanahas.github.io/bingo-batallon-1/

## Desarrollo local

```bash
npm install
npm run dev
```

## Estructura del proyecto

```
src/
├── app/
│   ├── page.js          # Componente principal
│   ├── layout.js        # Layout y metadatos
│   └── globals.css      # Estilos globales
public/
├── logo.png             # Logo del Batallón 1
└── favicon.ico          # Favicon del sitio
```

## Contribución

Este proyecto es específico para el Batallón 1 Pablo César Barton de Exploradores Argentinos de Don Bosco.

---

**Batallón 1 Pablo César Barton**  
*Exploradores Argentinos de Don Bosco*
