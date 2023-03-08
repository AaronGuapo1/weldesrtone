const whatsappBtn = document.getElementById("whatsapp-btn");

whatsappBtn.addEventListener("click", () => {
    const phoneNumber = "123456789"; // Reemplaza esto con tu número de teléfono
    const message = "Hola, ¿cómo puedo ayudarte?"; // Reemplaza esto con el mensaje que quieras enviar
    
    const whatsappLink = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;
    
    window.open(whatsappLink, "_blank");
});