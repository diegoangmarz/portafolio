/**
 * Se inyecta inline en <head> antes de pintar: aplica la clase `.dark` según localStorage
 * o, si no hay preferencia guardada, según el sistema. Mantener en sintonía con theme.tsx.
 */
export const themeScript = `(function(){try{var t=localStorage.getItem("theme");var d=t?t==="dark":matchMedia("(prefers-color-scheme: dark)").matches;var r=document.documentElement;r.classList.toggle("dark",d);r.style.colorScheme=d?"dark":"light"}catch(e){}})()`;
