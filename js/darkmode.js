document.addEventListener("DOMContentLoaded", () => {
    const darkModeToggle = document.getElementById("darkModeToggle");

    // Check localStorage and apply dark mode if enabled
    if (localStorage.getItem('darkMode') === 'enabled') {
        enableDarkMode();
    }

    darkModeToggle.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");

        if (document.body.classList.contains("dark-mode")) {
            enableDarkMode();
            localStorage.setItem('darkMode', 'enabled');
        } else {
            disableDarkMode();
            localStorage.setItem('darkMode', 'disabled');
        }
    });

    function enableDarkMode() {
        document.body.classList.add('dark-mode');
        const icon = darkModeToggle.querySelector('i');
        icon.classList.remove("fa-moon");
        icon.classList.add("fa-sun");

        // Toggle dark mode for items, info, and precio
        const items = document.querySelectorAll(".items");
        items.forEach(item => item.classList.add("dark-mode"));

        const infoItems = document.querySelectorAll(".info");
        infoItems.forEach(info => info.classList.add("dark-mode"));

        const precios = document.querySelectorAll(".precio");
        precios.forEach(precio => precio.classList.add("dark-mode"));

        const containers  = document.querySelectorAll(".containers ");
        containers.forEach(precio => precio.classList.add("dark-mode"));

        const column  = document.querySelectorAll(".column ");
        column.forEach(precio => precio.classList.add("dark-mode"));


    }

    function disableDarkMode() {
        document.body.classList.remove('dark-mode');
        const icon = darkModeToggle.querySelector('i');
        icon.classList.remove("fa-sun");
        icon.classList.add("fa-moon");

        // Toggle dark mode off for items, info, and precio
        const items = document.querySelectorAll(".items");
        items.forEach(item => item.classList.remove("dark-mode"));

        const infoItems = document.querySelectorAll(".info");
        infoItems.forEach(info => info.classList.remove("dark-mode"));

        const precios = document.querySelectorAll(".precio");
        precios.forEach(precio => precio.classList.remove("dark-mode"));

        const containers = document.querySelectorAll(".containers");
        containers.forEach(precio => precio.classList.remove("dark-mode"));

        const column = document.querySelectorAll(".column");
        column.forEach(precio => precio.classList.remove("dark-mode"));


    }
});