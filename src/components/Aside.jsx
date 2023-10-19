// App.js
import React from 'react';
import Aside from './Aside';

function App() {
    return (
        <div>
            <header>
                <h1>Título de la Página</h1>
            </header>
            
            <nav>
                {/* Menú de navegación principal */}
                <ul>
                    <li><a href="#">Inicio</a></li>
                    <li><a href="#">Acerca de</a></li>
                    <li><a href="#">Servicios</a></li>
                    <li><a href="#">Contacto</a></li>
                </ul>
            </nav>

            <main>
                {/* Contenido principal de la página */}
                <article>
                    <h2>Artículo Principal</h2>
                    <p>Este es el contenido principal de la página.</p>
                </article>
            </main>

            <Aside />
            
            <footer>
                <p>Pie de Página &copy; 2023</p>
            </footer>
        </div>
    );
}

export default App;
