export function fechaAString(date) {
    if(date == null) return 'xxxx-xx-xx xx:xx:xx';
    const fechaFormateada = new Intl.DateTimeFormat('es-AR', {
        day: '2-digit', month: '2-digit', year: 'numeric',
    }).format(date);
    const tiempoFormateado = new Intl.DateTimeFormat('es-AR', {
        hour: '2-digit', minute: '2-digit', second: '2-digit',
    }).format(date);

    return `${fechaFormateada} ${tiempoFormateado}`;
}