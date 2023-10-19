
import React from 'react';
import { Button, Icon } from 'semantic-ui-react';


function App() {
    return (
        <div>
            <header>
                <h1>Título de la Página</h1>
            </header>
            
            <nav>
                {/* Menú de navegación principal */}
                <ul>
                    <li><a href="#">tu biblioteca</a></li>  
                    <Button icon>
                        <Icon name='plus'/>
                        
                    </Button>

                </ul>
            </nav>

            <main>
                {/* Contenido principal de la página */}
                <article>
                    <h2>Artículo Principal</h2>
                    <p>Este es el contenido principal de la página.</p>
                </article>
            </main>
            
            <footer>
                <p>Pie de Página &copy; 2023</p>
            </footer>
        </div>
    );
}

export default App;
