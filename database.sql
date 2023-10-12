-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 12-10-2023 a las 06:13:39
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.2.4
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";
/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */
;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */
;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */
;
/*!40101 SET NAMES utf8mb4 */
;
--
-- Base de datos: `cursosadobe`
--
-- --------------------------------------------------------
--
-- Estructura de tabla para la tabla `cliente`
--
CREATE TABLE `cliente` (
    `id` int(11) NOT NULL,
    `nombre` varchar(255) NOT NULL,
    `nit` varchar(255) NOT NULL,
    `codigo` varchar(255) DEFAULT NULL,
    `nombre_path` varchar(255) NOT NULL,
    `url_imagen` varchar(255) DEFAULT NULL,
    `max_usuarios` int(11) NOT NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8 COLLATE = utf8_unicode_ci;
--
-- Volcado de datos para la tabla `cliente`
--
INSERT INTO `cliente` (
        `id`,
        `nombre`,
        `nit`,
        `codigo`,
        `nombre_path`,
        `url_imagen`,
        `max_usuarios`
    )
VALUES (
        1,
        'Sociedad Digital',
        '12345678',
        'D1JBYU',
        'sociedaddigital',
        'https://cursosadobe.com:2083/cpsess7318930609/viewer/home%2fcursosadobe%2fpublic_html%2fpublic/sociedaddigital.png',
        1000
    );
-- --------------------------------------------------------
--
-- Estructura de tabla para la tabla `contenidocurso`
--
CREATE TABLE `contenidocurso` (
    `id` int(11) NOT NULL,
    `curso_id` int(11) NOT NULL,
    `contenido` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`contenido`))
) ENGINE = InnoDB DEFAULT CHARSET = utf8 COLLATE = utf8_unicode_ci;
--
-- Volcado de datos para la tabla `contenidocurso`
--
INSERT INTO `contenidocurso` (`id`, `curso_id`, `contenido`)
VALUES (
        1,
        1,
        '[{\"nombre\": \"Introducci�n\", \"lecciones\": [{\"nombre\": \"Bienvenida\", \"duracion\": \"1:41\", \"url_video\": \"https://www.youtube.com/embed/NyztKaM4eyw\", \"descripcion\": \"En esta primera lecci�n, daremos los primeros pasos en el emocionante mundo de Adobe Express. Aprender�s los conceptos b�sicos de la aplicaci�n, c�mo navegar por su interfaz y explorar las funciones esenciales que te permitir�n crear contenido visual de alta calidad. Esta lecci�n establecer� una base s�lida para que puedas aprovechar al m�ximo todas las capacidades de Adobe Express en las lecciones siguientes. �Prep�rate para desatar tu creatividad y dominar Adobe Express!\"}]}, {\"nombre\": \"Dise�o\", \"lecciones\": [{\"nombre\": \"Dise�o generativo\", \"duracion\": \"4:08\", \"url_video\": \"https://www.youtube.com/embed/5-L2mJiuYOY\", \"descripcion\": \"Explora las maravillas del dise�o generativo en Adobe Express. Aprende a utilizar algoritmos y patrones para crear obras de arte �nicas y din�micas que evolucionan con cada iteraci�n. Desbloquea tu creatividad y descubre c�mo la tecnolog�a puede ser una fuente infinita de inspiraci�n en el mundo del dise�o.\"}, {\"nombre\": \"Trabajo con plantillas\", \"duracion\": \"9:52\", \"url_video\": \"https://www.youtube.com/embed/szZTttJJrho\", \"descripcion\": \"Domina la eficiencia del dise�o utilizando plantillas en Adobe Express. Descubre c�mo optimizar tu flujo de trabajo al aprovechar una amplia variedad de plantillas predefinidas para crear contenido visualmente impactante. Desde presentaciones hasta publicaciones en redes sociales, aprende a personalizar y adaptar plantillas para satisfacer tus necesidades creativas de manera r�pida y sencilla.\"}, {\"nombre\": \"Importaci�n de recursos\", \"duracion\": \"3:06\", \"url_video\": \"https://www.youtube.com/embed/ygVRyGrdEss\", \"descripcion\": \"Aprende a enriquecer tus proyectos en Adobe Express mediante la importaci�n efectiva de recursos. Explora c�mo incorporar im�genes, videos, iconos y m�s desde fuentes externas para ampliar tus opciones creativas. Domina las t�cnicas de gesti�n y organizaci�n de recursos para agilizar tu proceso de dise�o y llevar tus creaciones al siguiente nivel.\"}, {\"nombre\": \"Herramientas de trabajo\", \"duracion\": \"5:23\", \"url_video\": \"https://www.youtube.com/embed/au-AGwddrgk\", \"descripcion\": \"Ad�ntrate en las poderosas herramientas de trabajo de Adobe Express. Descubre c�mo aprovechar al m�ximo las diversas funciones y opciones disponibles en la aplicaci�n para dar vida a tus ideas creativas. Desde la edici�n de im�genes hasta la creaci�n de contenido multimedia, esta lecci�n te proporcionar� las habilidades esenciales para trabajar de manera eficiente y efectiva en Adobe Express.\"}]}, {\"nombre\": \"Video\", \"lecciones\": [{\"nombre\": \"Creaci�n desde plantilla\", \"duracion\": \"4:34\", \"url_video\": \"https://www.youtube.com/embed/6p4QDWsh_xg\", \"descripcion\": \"Aprende a dar vida a tu visi�n creativa utilizando plantillas como punto de partida en Adobe Express. Esta lecci�n te mostrar� c�mo personalizar y adaptar plantillas predefinidas para crear proyectos �nicos y profesionales. Desde folletos hasta banners web, descubre c�mo aprovechar al m�ximo las plantillas para agilizar tu proceso de dise�o y obtener resultados impresionantes.\"}, {\"nombre\": \"Importaci�n de recursos\", \"duracion\": \"2:45\", \"url_video\": \"https://www.youtube.com/embed/SSFGGUYL6Ww\", \"descripcion\": \"Explora c�mo enriquecer tus proyectos en Adobe Express a trav�s de la importaci�n de recursos externos. Aprende a incorporar im�genes, videos, fuentes y otros elementos para personalizar y ampliar tus creaciones. Esta lecci�n te guiar� en el proceso de importaci�n, organizaci�n y optimizaci�n de recursos, permiti�ndote llevar tus dise�os a un nivel superior con una amplia variedad de opciones creativas a tu alcance.\"}, {\"nombre\": \"Narraci�n y m�sica\", \"duracion\": \"1:33\", \"url_video\": \"https://www.youtube.com/embed/T_KS_jSFP-s\", \"descripcion\": \"En esta emocionante lecci�n, descubrir�s c�mo a�adir narraci�n y m�sica a tus proyectos multimedia utilizando Adobe Express. Aprender�s a sincronizar audio con video, crear efectos sonoros, y combinar m�sica y voz para dar vida a tus producciones. Desde videos informativos hasta presentaciones atractivas, esta lecci�n te mostrar� c�mo dar un toque profesional a tus contenidos multimedia con Adobe Express.\"}, {\"nombre\": \"Exportaci�n\", \"duracion\": \"3:03\", \"url_video\": \"https://www.youtube.com/embed/aAioQbIiwmY\", \"descripcion\": \"En esta lecci�n, te adentrar�s en el proceso de exportaci�n en Adobe Express. Aprender�s c�mo preparar tus proyectos para compartirlos con el mundo, ya sea en l�nea o en diferentes formatos de archivo. Descubrir�s las opciones de exportaci�n, la optimizaci�n de configuraciones y c�mo garantizar la m�xima calidad en tus trabajos finales. Domina el arte de llevar tus creaciones de Adobe Express al p�blico con esta lecci�n esencial sobre exportaci�n.\"}]}, {\"nombre\": \"Presentaciones\", \"lecciones\": [{\"nombre\": \"Creaci�n de presentaciones\", \"duracion\": \"2:02\", \"url_video\": \"https://www.youtube.com/embed/uO_vfxUD5PY\", \"descripcion\": \"En esta lecci�n, te sumergir�s en el mundo de la creaci�n de presentaciones impactantes con Adobe Express. Aprender�s a dise�ar diapositivas visualmente atractivas, incorporar elementos multimedia, y agregar efectos de transici�n que mantendr�n a tu audiencia comprometida. Ya sea para presentaciones escolares, comerciales o personales, descubre c�mo utilizar Adobe Express para dar vida a tus ideas y contar historias de manera efectiva a trav�s de presentaciones impresionantes.\"}, {\"nombre\": \"Elementos a a�adir\", \"duracion\": \"7:44\", \"url_video\": \"https://www.youtube.com/embed/-aOLgxm_Oq0\", \"descripcion\": \"En esta lecci�n, exploraremos las diversas opciones de elementos que puedes incorporar a tus proyectos con Adobe Express. Aprender�s a enriquecer tus creaciones con im�genes, gr�ficos, iconos, texto, y otros recursos visuales. Descubre c�mo combinar estos elementos de manera efectiva para crear contenido atractivo y significativo. Desde la mejora de fotos hasta la creaci�n de gr�ficos impactantes, esta lecci�n te guiar� en la incorporaci�n de elementos clave en tus dise�os con Adobe Express.\"}, {\"nombre\": \"Compartir paginas\", \"duracion\": \"2:10\", \"url_video\": \"https://www.youtube.com/embed/NICYFxjCnK4\", \"descripcion\": \"En esta lecci�n, te adentrar�s en el proceso de compartir p�ginas de manera eficiente utilizando Adobe Express. Aprender�s c�mo exportar y compartir tus proyectos en l�nea, as� como optimizarlos para diferentes plataformas y audiencias. Descubre las mejores pr�cticas para la distribuci�n de contenido web, redes sociales y mucho m�s. Domina las t�cnicas de compartir tus creaciones de Adobe Express y alcanza a tu p�blico de manera efectiva.\"}, {\"nombre\": \"Exportar en PDF\", \"duracion\": \"2:00\", \"url_video\": \"https://www.youtube.com/embed/x4gIoDzFIwM\", \"descripcion\": \"En esta lecci�n, te ense�aremos c�mo exportar tus proyectos en formato PDF utilizando Adobe Express. Aprender�s los pasos clave para convertir tus creaciones en documentos PDF de alta calidad, ideales para presentaciones, informes, y compartir contenido en un formato universalmente reconocido. Explora las opciones de personalizaci�n y configuraci�n para asegurarte de que tus documentos PDF se adapten perfectamente a tus necesidades. Domina la exportaci�n a PDF con Adobe Express y haz que tu contenido sea accesible y profesional.\"}]}, {\"nombre\": \"Programador de contenido\", \"lecciones\": [{\"nombre\": \"Conectar cuentas\", \"duracion\": \"1:22\", \"url_video\": \"https://www.youtube.com/embed/qNH9Ufx5g2Y\", \"descripcion\": \"En esta lecci�n, te guiaremos a trav�s del proceso de conectar cuentas en Adobe Express. Aprender�s c�mo vincular tus perfiles y cuentas de redes sociales, servicios de almacenamiento en la nube y otros recursos externos a tu proyecto de Adobe Express. Descubre c�mo simplificar la gesti�n y el flujo de trabajo al conectar cuentas, permitiendo un acceso m�s fluido y una colaboraci�n efectiva en tus proyectos creativos.\"}, {\"nombre\": \"Programar y publicar\", \"duracion\": \"3:22\", \"url_video\": \"https://www.youtube.com/embed/lcWD8AUOlp4\", \"descripcion\": \"En esta lecci�n, exploraremos c�mo programar y publicar tus proyectos de manera efectiva utilizando Adobe Express. Aprender�s a establecer fechas de publicaci�n, programar contenido y automatizar el proceso de lanzamiento en diversas plataformas en l�nea. Desde redes sociales hasta blogs y sitios web, esta lecci�n te ayudar� a optimizar tu flujo de trabajo y llegar a tu audiencia en el momento adecuado. Domina la programaci�n y publicaci�n con Adobe Express y maximiza el impacto de tus creaciones.\"}, {\"nombre\": \"Redes sociales\", \"duracion\": \"1:29\", \"url_video\": \"https://www.youtube.com/embed/hErBZExaTyA\", \"descripcion\": \"En esta lecci�n, te sumergir�s en el mundo de las redes sociales y c�mo Adobe Express puede potenciar tu presencia en l�nea. Aprender�s a crear contenido atractivo y visualmente impactante espec�ficamente dise�ado para plataformas de redes sociales como Facebook, Instagram, Twitter y m�s. Descubre c�mo optimizar tus im�genes, videos y gr�ficos para destacar en los feeds de noticias y aumentar la participaci�n de tu audiencia. Eleva tu estrategia en redes sociales con las poderosas herramientas de Adobe Express.\"}, {\"nombre\": \"Despedida\", \"duracion\": \"1:45\", \"url_video\": \"https://www.youtube.com/embed/NSAbqdiRuv8\", \"descripcion\": \"En esta �ltima lecci�n, cerraremos tu curso de Adobe Express de manera gratificante. Reflexionaremos sobre lo que has aprendido y c�mo puedes aplicar tus nuevas habilidades en tu trabajo creativo o proyectos personales. Adem�s, te proporcionaremos recursos adicionales y consejos para seguir desarroll�ndote en el mundo de la creaci�n multimedia. �Esperamos que hayas disfrutado y te sientas preparado para utilizar Adobe Express de manera efectiva en tus futuros proyectos!\"}]}]'
    ),
    (
        2,
        2,
        '[{\"nombre\": \"Bienvenida\", \"lecciones\": [{\"nombre\": \"Introducción\", \"url_video\": \"https://www.youtube.com/embed/NyztKaM4eyw\", \"descripcion\": \"Que es adobe express y que podemos hacer con esta herramienta\"}]}, {\"nombre\": \"Diseño\", \"lecciones\": [{\"nombre\": \"Diseño generativo\", \"url_video\": \"https://www.youtube.com/embed/YrUKh0WwZQc\", \"descripcion\": \"Explora las maravillas del diseño generativo en Adobe Express. Aprende a utilizar algoritmos y patrones para crear obras de arte únicas y dinámicas que evolucionan con cada iteración. Desbloquea tu creatividad y descubre cómo la tecnología puede ser una fuente infinita de inspiración en el mundo del diseño.\"}, {\"nombre\": \"Trabajo con plantillas\", \"url_video\": \"https://www.youtube.com/embed/YrUKh0WwZQc\", \"descripcion\": \"Domina la eficiencia del diseño utilizando plantillas en Adobe Express. Descubre cómo optimizar tu flujo de trabajo al aprovechar una amplia variedad de plantillas predefinidas para crear contenido visualmente impactante. Desde presentaciones hasta publicaciones en redes sociales, aprende a personalizar y adaptar plantillas para satisfacer tus necesidades creativas de manera rápida y sencilla.\"}, {\"nombre\": \"Importación de recursos\", \"url_video\": \"https://www.youtube.com/embed/YrUKh0WwZQc\", \"descripcion\": \"Aprende a enriquecer tus proyectos en Adobe Express mediante la importación efectiva de recursos. Explora cómo incorporar imágenes, videos, iconos y más desde fuentes externas para ampliar tus opciones creativas. Domina las técnicas de gestión y organización de recursos para agilizar tu proceso de diseño y llevar tus creaciones al siguiente nivel.\"}, {\"nombre\": \"Herramientas de trabajo\", \"url_video\": \"https://www.youtube.com/embed/YrUKh0WwZQc\", \"descripcion\": \"Adéntrate en las poderosas herramientas de trabajo de Adobe Express. Descubre cómo aprovechar al máximo las diversas funciones y opciones disponibles en la aplicación para dar vida a tus ideas creativas. Desde la edición de imágenes hasta la creación de contenido multimedia, esta lección te proporcionará las habilidades esenciales para trabajar de manera eficiente y efectiva en Adobe Express.\"}]}, {\"nombre\": \"Video\", \"lecciones\": [{\"nombre\": \"Creación desde plantilla\", \"url_video\": \"https://www.youtube.com/embed/YrUKh0WwZQc\", \"descripcion\": \"Aprende a dar vida a tu visión creativa utilizando plantillas como punto de partida en Adobe Express. Esta lección te mostrará cómo personalizar y adaptar plantillas predefinidas para crear proyectos únicos y profesionales. Desde folletos hasta banners web, descubre cómo aprovechar al máximo las plantillas para agilizar tu proceso de diseño y obtener resultados impresionantes.\"}, {\"nombre\": \"Importación de recursos\", \"url_video\": \"https://www.youtube.com/embed/YrUKh0WwZQc\", \"descripcion\": \"Explora cómo enriquecer tus proyectos en Adobe Express a través de la importación de recursos externos. Aprende a incorporar imágenes, videos, fuentes y otros elementos para personalizar y ampliar tus creaciones. Esta lección te guiará en el proceso de importación, organización y optimización de recursos, permitiéndote llevar tus diseños a un nivel superior con una amplia variedad de opciones creativas a tu alcance.\"}, {\"nombre\": \"Creación de activos\", \"url_video\": \"https://www.youtube.com/embed/YrUKh0WwZQc\", \"descripcion\": \"En esta lección, aprenderás a utilizar Adobe Express para crear activos visuales impactantes. Exploraremos las herramientas y técnicas clave para diseñar gráficos, imágenes y elementos visuales que se pueden utilizar en una variedad de proyectos, desde presentaciones hasta redes sociales. ¡Desata tu creatividad y domina la creación de activos con Adobe Express!\"}, {\"nombre\": \"Narración y música\", \"url_video\": \"https://www.youtube.com/embed/YrUKh0WwZQc\", \"descripcion\": \"En esta emocionante lección, descubrirás cómo añadir narración y música a tus proyectos multimedia utilizando Adobe Express. Aprenderás a sincronizar audio con video, crear efectos sonoros, y combinar música y voz para dar vida a tus producciones. Desde videos informativos hasta presentaciones atractivas, esta lección te mostrará cómo dar un toque profesional a tus contenidos multimedia con Adobe Express.\"}, {\"nombre\": \"Exportación\", \"url_video\": \"https://www.youtube.com/embed/YrUKh0WwZQc\", \"descripcion\": \"En esta lección, te adentrarás en el proceso de exportación en Adobe Express. Aprenderás cómo preparar tus proyectos para compartirlos con el mundo, ya sea en línea o en diferentes formatos de archivo. Descubrirás las opciones de exportación, la optimización de configuraciones y cómo garantizar la máxima calidad en tus trabajos finales. Domina el arte de llevar tus creaciones de Adobe Express al público con esta lección esencial sobre exportación.\"}]}, {\"nombre\": \"Presentaciones\", \"lecciones\": [{\"nombre\": \"Creación de paginas\", \"url_video\": \"https://www.youtube.com/embed/YrUKh0WwZQc\", \"descripcion\": \"Descripcion de la leccion 1\"}, {\"nombre\": \"Elementos a añadir\", \"url_video\": \"https://www.youtube.com/embed/YrUKh0WwZQc\", \"descripcion\": \"Descripcion de la leccion 2\"}, {\"nombre\": \"Plantillas de color\", \"url_video\": \"https://www.youtube.com/embed/YrUKh0WwZQc\", \"descripcion\": \"Descripcion de la leccion 2\"}, {\"nombre\": \"Compartir paginas\", \"url_video\": \"https://www.youtube.com/embed/YrUKh0WwZQc\", \"descripcion\": \"Descripcion de la leccion 2\"}, {\"nombre\": \"Exportar en PDF\", \"url_video\": \"https://www.youtube.com/embed/YrUKh0WwZQc\", \"descripcion\": \"Descripcion de la leccion 2\"}]}, {\"nombre\": \"Programador de contenido\", \"lecciones\": [{\"nombre\": \"Conectar cuentas\", \"url_video\": \"https://www.youtube.com/embed/YrUKh0WwZQc\", \"descripcion\": \"Descripcion de la leccion 1\"}, {\"nombre\": \"Programar y publicar\", \"url_video\": \"https://www.youtube.com/embed/YrUKh0WwZQc\", \"descripcion\": \"Descripcion de la leccion 2\"}, {\"nombre\": \"Redes sociales\", \"url_video\": \"https://www.youtube.com/embed/YrUKh0WwZQc\", \"descripcion\": \"Descripcion de la leccion 2\"}, {\"nombre\": \"Exportar recursos locales\", \"url_video\": \"https://www.youtube.com/embed/YrUKh0WwZQc\", \"descripcion\": \"Descripcion de la leccion 2\"}]}]'
    ),
    (
        3,
        3,
        '[{\"nombre\": \"Bienvenida\", \"lecciones\": [{\"nombre\": \"Introducción\", \"url_video\": \"https://www.youtube.com/embed/NyztKaM4eyw\", \"descripcion\": \"Que es adobe express y que podemos hacer con esta herramienta\"}]}, {\"nombre\": \"Diseño\", \"lecciones\": [{\"nombre\": \"Diseño generativo\", \"url_video\": \"https://www.youtube.com/embed/YrUKh0WwZQc\", \"descripcion\": \"Explora las maravillas del diseño generativo en Adobe Express. Aprende a utilizar algoritmos y patrones para crear obras de arte únicas y dinámicas que evolucionan con cada iteración. Desbloquea tu creatividad y descubre cómo la tecnología puede ser una fuente infinita de inspiración en el mundo del diseño.\"}, {\"nombre\": \"Trabajo con plantillas\", \"url_video\": \"https://www.youtube.com/embed/YrUKh0WwZQc\", \"descripcion\": \"Domina la eficiencia del diseño utilizando plantillas en Adobe Express. Descubre cómo optimizar tu flujo de trabajo al aprovechar una amplia variedad de plantillas predefinidas para crear contenido visualmente impactante. Desde presentaciones hasta publicaciones en redes sociales, aprende a personalizar y adaptar plantillas para satisfacer tus necesidades creativas de manera rápida y sencilla.\"}, {\"nombre\": \"Importación de recursos\", \"url_video\": \"https://www.youtube.com/embed/YrUKh0WwZQc\", \"descripcion\": \"Aprende a enriquecer tus proyectos en Adobe Express mediante la importación efectiva de recursos. Explora cómo incorporar imágenes, videos, iconos y más desde fuentes externas para ampliar tus opciones creativas. Domina las técnicas de gestión y organización de recursos para agilizar tu proceso de diseño y llevar tus creaciones al siguiente nivel.\"}, {\"nombre\": \"Herramientas de trabajo\", \"url_video\": \"https://www.youtube.com/embed/YrUKh0WwZQc\", \"descripcion\": \"Adéntrate en las poderosas herramientas de trabajo de Adobe Express. Descubre cómo aprovechar al máximo las diversas funciones y opciones disponibles en la aplicación para dar vida a tus ideas creativas. Desde la edición de imágenes hasta la creación de contenido multimedia, esta lección te proporcionará las habilidades esenciales para trabajar de manera eficiente y efectiva en Adobe Express.\"}]}, {\"nombre\": \"Video\", \"lecciones\": [{\"nombre\": \"Creación desde plantilla\", \"url_video\": \"https://www.youtube.com/embed/YrUKh0WwZQc\", \"descripcion\": \"Aprende a dar vida a tu visión creativa utilizando plantillas como punto de partida en Adobe Express. Esta lección te mostrará cómo personalizar y adaptar plantillas predefinidas para crear proyectos únicos y profesionales. Desde folletos hasta banners web, descubre cómo aprovechar al máximo las plantillas para agilizar tu proceso de diseño y obtener resultados impresionantes.\"}, {\"nombre\": \"Importación de recursos\", \"url_video\": \"https://www.youtube.com/embed/YrUKh0WwZQc\", \"descripcion\": \"Explora cómo enriquecer tus proyectos en Adobe Express a través de la importación de recursos externos. Aprende a incorporar imágenes, videos, fuentes y otros elementos para personalizar y ampliar tus creaciones. Esta lección te guiará en el proceso de importación, organización y optimización de recursos, permitiéndote llevar tus diseños a un nivel superior con una amplia variedad de opciones creativas a tu alcance.\"}, {\"nombre\": \"Creación de activos\", \"url_video\": \"https://www.youtube.com/embed/YrUKh0WwZQc\", \"descripcion\": \"En esta lección, aprenderás a utilizar Adobe Express para crear activos visuales impactantes. Exploraremos las herramientas y técnicas clave para diseñar gráficos, imágenes y elementos visuales que se pueden utilizar en una variedad de proyectos, desde presentaciones hasta redes sociales. ¡Desata tu creatividad y domina la creación de activos con Adobe Express!\"}, {\"nombre\": \"Narración y música\", \"url_video\": \"https://www.youtube.com/embed/YrUKh0WwZQc\", \"descripcion\": \"En esta emocionante lección, descubrirás cómo añadir narración y música a tus proyectos multimedia utilizando Adobe Express. Aprenderás a sincronizar audio con video, crear efectos sonoros, y combinar música y voz para dar vida a tus producciones. Desde videos informativos hasta presentaciones atractivas, esta lección te mostrará cómo dar un toque profesional a tus contenidos multimedia con Adobe Express.\"}, {\"nombre\": \"Exportación\", \"url_video\": \"https://www.youtube.com/embed/YrUKh0WwZQc\", \"descripcion\": \"En esta lección, te adentrarás en el proceso de exportación en Adobe Express. Aprenderás cómo preparar tus proyectos para compartirlos con el mundo, ya sea en línea o en diferentes formatos de archivo. Descubrirás las opciones de exportación, la optimización de configuraciones y cómo garantizar la máxima calidad en tus trabajos finales. Domina el arte de llevar tus creaciones de Adobe Express al público con esta lección esencial sobre exportación.\"}]}, {\"nombre\": \"Presentaciones\", \"lecciones\": [{\"nombre\": \"Creación de paginas\", \"url_video\": \"https://www.youtube.com/embed/YrUKh0WwZQc\", \"descripcion\": \"Descripcion de la leccion 1\"}, {\"nombre\": \"Elementos a añadir\", \"url_video\": \"https://www.youtube.com/embed/YrUKh0WwZQc\", \"descripcion\": \"Descripcion de la leccion 2\"}, {\"nombre\": \"Plantillas de color\", \"url_video\": \"https://www.youtube.com/embed/YrUKh0WwZQc\", \"descripcion\": \"Descripcion de la leccion 2\"}, {\"nombre\": \"Compartir paginas\", \"url_video\": \"https://www.youtube.com/embed/YrUKh0WwZQc\", \"descripcion\": \"Descripcion de la leccion 2\"}, {\"nombre\": \"Exportar en PDF\", \"url_video\": \"https://www.youtube.com/embed/YrUKh0WwZQc\", \"descripcion\": \"Descripcion de la leccion 2\"}]}, {\"nombre\": \"Programador de contenido\", \"lecciones\": [{\"nombre\": \"Conectar cuentas\", \"url_video\": \"https://www.youtube.com/embed/YrUKh0WwZQc\", \"descripcion\": \"Descripcion de la leccion 1\"}, {\"nombre\": \"Programar y publicar\", \"url_video\": \"https://www.youtube.com/embed/YrUKh0WwZQc\", \"descripcion\": \"Descripcion de la leccion 2\"}, {\"nombre\": \"Redes sociales\", \"url_video\": \"https://www.youtube.com/embed/YrUKh0WwZQc\", \"descripcion\": \"Descripcion de la leccion 2\"}, {\"nombre\": \"Exportar recursos locales\", \"url_video\": \"https://www.youtube.com/embed/YrUKh0WwZQc\", \"descripcion\": \"Descripcion de la leccion 2\"}]}]'
    ),
    (
        4,
        4,
        '[{\"nombre\": \"Bienvenida\", \"lecciones\": [{\"nombre\": \"Introducción\", \"url_video\": \"https://www.youtube.com/embed/NyztKaM4eyw\", \"descripcion\": \"Que es adobe express y que podemos hacer con esta herramienta\"}]}, {\"nombre\": \"Diseño\", \"lecciones\": [{\"nombre\": \"Diseño generativo\", \"url_video\": \"https://www.youtube.com/embed/YrUKh0WwZQc\", \"descripcion\": \"Explora las maravillas del diseño generativo en Adobe Express. Aprende a utilizar algoritmos y patrones para crear obras de arte únicas y dinámicas que evolucionan con cada iteración. Desbloquea tu creatividad y descubre cómo la tecnología puede ser una fuente infinita de inspiración en el mundo del diseño.\"}, {\"nombre\": \"Trabajo con plantillas\", \"url_video\": \"https://www.youtube.com/embed/YrUKh0WwZQc\", \"descripcion\": \"Domina la eficiencia del diseño utilizando plantillas en Adobe Express. Descubre cómo optimizar tu flujo de trabajo al aprovechar una amplia variedad de plantillas predefinidas para crear contenido visualmente impactante. Desde presentaciones hasta publicaciones en redes sociales, aprende a personalizar y adaptar plantillas para satisfacer tus necesidades creativas de manera rápida y sencilla.\"}, {\"nombre\": \"Importación de recursos\", \"url_video\": \"https://www.youtube.com/embed/YrUKh0WwZQc\", \"descripcion\": \"Aprende a enriquecer tus proyectos en Adobe Express mediante la importación efectiva de recursos. Explora cómo incorporar imágenes, videos, iconos y más desde fuentes externas para ampliar tus opciones creativas. Domina las técnicas de gestión y organización de recursos para agilizar tu proceso de diseño y llevar tus creaciones al siguiente nivel.\"}, {\"nombre\": \"Herramientas de trabajo\", \"url_video\": \"https://www.youtube.com/embed/YrUKh0WwZQc\", \"descripcion\": \"Adéntrate en las poderosas herramientas de trabajo de Adobe Express. Descubre cómo aprovechar al máximo las diversas funciones y opciones disponibles en la aplicación para dar vida a tus ideas creativas. Desde la edición de imágenes hasta la creación de contenido multimedia, esta lección te proporcionará las habilidades esenciales para trabajar de manera eficiente y efectiva en Adobe Express.\"}]}, {\"nombre\": \"Video\", \"lecciones\": [{\"nombre\": \"Creación desde plantilla\", \"url_video\": \"https://www.youtube.com/embed/YrUKh0WwZQc\", \"descripcion\": \"Aprende a dar vida a tu visión creativa utilizando plantillas como punto de partida en Adobe Express. Esta lección te mostrará cómo personalizar y adaptar plantillas predefinidas para crear proyectos únicos y profesionales. Desde folletos hasta banners web, descubre cómo aprovechar al máximo las plantillas para agilizar tu proceso de diseño y obtener resultados impresionantes.\"}, {\"nombre\": \"Importación de recursos\", \"url_video\": \"https://www.youtube.com/embed/YrUKh0WwZQc\", \"descripcion\": \"Explora cómo enriquecer tus proyectos en Adobe Express a través de la importación de recursos externos. Aprende a incorporar imágenes, videos, fuentes y otros elementos para personalizar y ampliar tus creaciones. Esta lección te guiará en el proceso de importación, organización y optimización de recursos, permitiéndote llevar tus diseños a un nivel superior con una amplia variedad de opciones creativas a tu alcance.\"}, {\"nombre\": \"Creación de activos\", \"url_video\": \"https://www.youtube.com/embed/YrUKh0WwZQc\", \"descripcion\": \"En esta lección, aprenderás a utilizar Adobe Express para crear activos visuales impactantes. Exploraremos las herramientas y técnicas clave para diseñar gráficos, imágenes y elementos visuales que se pueden utilizar en una variedad de proyectos, desde presentaciones hasta redes sociales. ¡Desata tu creatividad y domina la creación de activos con Adobe Express!\"}, {\"nombre\": \"Narración y música\", \"url_video\": \"https://www.youtube.com/embed/YrUKh0WwZQc\", \"descripcion\": \"En esta emocionante lección, descubrirás cómo añadir narración y música a tus proyectos multimedia utilizando Adobe Express. Aprenderás a sincronizar audio con video, crear efectos sonoros, y combinar música y voz para dar vida a tus producciones. Desde videos informativos hasta presentaciones atractivas, esta lección te mostrará cómo dar un toque profesional a tus contenidos multimedia con Adobe Express.\"}, {\"nombre\": \"Exportación\", \"url_video\": \"https://www.youtube.com/embed/YrUKh0WwZQc\", \"descripcion\": \"En esta lección, te adentrarás en el proceso de exportación en Adobe Express. Aprenderás cómo preparar tus proyectos para compartirlos con el mundo, ya sea en línea o en diferentes formatos de archivo. Descubrirás las opciones de exportación, la optimización de configuraciones y cómo garantizar la máxima calidad en tus trabajos finales. Domina el arte de llevar tus creaciones de Adobe Express al público con esta lección esencial sobre exportación.\"}]}, {\"nombre\": \"Presentaciones\", \"lecciones\": [{\"nombre\": \"Creación de paginas\", \"url_video\": \"https://www.youtube.com/embed/YrUKh0WwZQc\", \"descripcion\": \"Descripcion de la leccion 1\"}, {\"nombre\": \"Elementos a añadir\", \"url_video\": \"https://www.youtube.com/embed/YrUKh0WwZQc\", \"descripcion\": \"Descripcion de la leccion 2\"}, {\"nombre\": \"Plantillas de color\", \"url_video\": \"https://www.youtube.com/embed/YrUKh0WwZQc\", \"descripcion\": \"Descripcion de la leccion 2\"}, {\"nombre\": \"Compartir paginas\", \"url_video\": \"https://www.youtube.com/embed/YrUKh0WwZQc\", \"descripcion\": \"Descripcion de la leccion 2\"}, {\"nombre\": \"Exportar en PDF\", \"url_video\": \"https://www.youtube.com/embed/YrUKh0WwZQc\", \"descripcion\": \"Descripcion de la leccion 2\"}]}, {\"nombre\": \"Programador de contenido\", \"lecciones\": [{\"nombre\": \"Conectar cuentas\", \"url_video\": \"https://www.youtube.com/embed/YrUKh0WwZQc\", \"descripcion\": \"Descripcion de la leccion 1\"}, {\"nombre\": \"Programar y publicar\", \"url_video\": \"https://www.youtube.com/embed/YrUKh0WwZQc\", \"descripcion\": \"Descripcion de la leccion 2\"}, {\"nombre\": \"Redes sociales\", \"url_video\": \"https://www.youtube.com/embed/YrUKh0WwZQc\", \"descripcion\": \"Descripcion de la leccion 2\"}, {\"nombre\": \"Exportar recursos locales\", \"url_video\": \"https://www.youtube.com/embed/YrUKh0WwZQc\", \"descripcion\": \"Descripcion de la leccion 2\"}]}]'
    ),
    (
        5,
        5,
        '[{\"nombre\": \"Bienvenida\", \"lecciones\": [{\"nombre\": \"Introducción\", \"url_video\": \"https://www.youtube.com/embed/NyztKaM4eyw\", \"descripcion\": \"Que es adobe express y que podemos hacer con esta herramienta\"}]}, {\"nombre\": \"Diseño\", \"lecciones\": [{\"nombre\": \"Diseño generativo\", \"url_video\": \"https://www.youtube.com/embed/YrUKh0WwZQc\", \"descripcion\": \"Explora las maravillas del diseño generativo en Adobe Express. Aprende a utilizar algoritmos y patrones para crear obras de arte únicas y dinámicas que evolucionan con cada iteración. Desbloquea tu creatividad y descubre cómo la tecnología puede ser una fuente infinita de inspiración en el mundo del diseño.\"}, {\"nombre\": \"Trabajo con plantillas\", \"url_video\": \"https://www.youtube.com/embed/YrUKh0WwZQc\", \"descripcion\": \"Domina la eficiencia del diseño utilizando plantillas en Adobe Express. Descubre cómo optimizar tu flujo de trabajo al aprovechar una amplia variedad de plantillas predefinidas para crear contenido visualmente impactante. Desde presentaciones hasta publicaciones en redes sociales, aprende a personalizar y adaptar plantillas para satisfacer tus necesidades creativas de manera rápida y sencilla.\"}, {\"nombre\": \"Importación de recursos\", \"url_video\": \"https://www.youtube.com/embed/YrUKh0WwZQc\", \"descripcion\": \"Aprende a enriquecer tus proyectos en Adobe Express mediante la importación efectiva de recursos. Explora cómo incorporar imágenes, videos, iconos y más desde fuentes externas para ampliar tus opciones creativas. Domina las técnicas de gestión y organización de recursos para agilizar tu proceso de diseño y llevar tus creaciones al siguiente nivel.\"}, {\"nombre\": \"Herramientas de trabajo\", \"url_video\": \"https://www.youtube.com/embed/YrUKh0WwZQc\", \"descripcion\": \"Adéntrate en las poderosas herramientas de trabajo de Adobe Express. Descubre cómo aprovechar al máximo las diversas funciones y opciones disponibles en la aplicación para dar vida a tus ideas creativas. Desde la edición de imágenes hasta la creación de contenido multimedia, esta lección te proporcionará las habilidades esenciales para trabajar de manera eficiente y efectiva en Adobe Express.\"}]}, {\"nombre\": \"Video\", \"lecciones\": [{\"nombre\": \"Creación desde plantilla\", \"url_video\": \"https://www.youtube.com/embed/YrUKh0WwZQc\", \"descripcion\": \"Aprende a dar vida a tu visión creativa utilizando plantillas como punto de partida en Adobe Express. Esta lección te mostrará cómo personalizar y adaptar plantillas predefinidas para crear proyectos únicos y profesionales. Desde folletos hasta banners web, descubre cómo aprovechar al máximo las plantillas para agilizar tu proceso de diseño y obtener resultados impresionantes.\"}, {\"nombre\": \"Importación de recursos\", \"url_video\": \"https://www.youtube.com/embed/YrUKh0WwZQc\", \"descripcion\": \"Explora cómo enriquecer tus proyectos en Adobe Express a través de la importación de recursos externos. Aprende a incorporar imágenes, videos, fuentes y otros elementos para personalizar y ampliar tus creaciones. Esta lección te guiará en el proceso de importación, organización y optimización de recursos, permitiéndote llevar tus diseños a un nivel superior con una amplia variedad de opciones creativas a tu alcance.\"}, {\"nombre\": \"Creación de activos\", \"url_video\": \"https://www.youtube.com/embed/YrUKh0WwZQc\", \"descripcion\": \"En esta lección, aprenderás a utilizar Adobe Express para crear activos visuales impactantes. Exploraremos las herramientas y técnicas clave para diseñar gráficos, imágenes y elementos visuales que se pueden utilizar en una variedad de proyectos, desde presentaciones hasta redes sociales. ¡Desata tu creatividad y domina la creación de activos con Adobe Express!\"}, {\"nombre\": \"Narración y música\", \"url_video\": \"https://www.youtube.com/embed/YrUKh0WwZQc\", \"descripcion\": \"En esta emocionante lección, descubrirás cómo añadir narración y música a tus proyectos multimedia utilizando Adobe Express. Aprenderás a sincronizar audio con video, crear efectos sonoros, y combinar música y voz para dar vida a tus producciones. Desde videos informativos hasta presentaciones atractivas, esta lección te mostrará cómo dar un toque profesional a tus contenidos multimedia con Adobe Express.\"}, {\"nombre\": \"Exportación\", \"url_video\": \"https://www.youtube.com/embed/YrUKh0WwZQc\", \"descripcion\": \"En esta lección, te adentrarás en el proceso de exportación en Adobe Express. Aprenderás cómo preparar tus proyectos para compartirlos con el mundo, ya sea en línea o en diferentes formatos de archivo. Descubrirás las opciones de exportación, la optimización de configuraciones y cómo garantizar la máxima calidad en tus trabajos finales. Domina el arte de llevar tus creaciones de Adobe Express al público con esta lección esencial sobre exportación.\"}]}, {\"nombre\": \"Presentaciones\", \"lecciones\": [{\"nombre\": \"Creación de paginas\", \"url_video\": \"https://www.youtube.com/embed/YrUKh0WwZQc\", \"descripcion\": \"Descripcion de la leccion 1\"}, {\"nombre\": \"Elementos a añadir\", \"url_video\": \"https://www.youtube.com/embed/YrUKh0WwZQc\", \"descripcion\": \"Descripcion de la leccion 2\"}, {\"nombre\": \"Plantillas de color\", \"url_video\": \"https://www.youtube.com/embed/YrUKh0WwZQc\", \"descripcion\": \"Descripcion de la leccion 2\"}, {\"nombre\": \"Compartir paginas\", \"url_video\": \"https://www.youtube.com/embed/YrUKh0WwZQc\", \"descripcion\": \"Descripcion de la leccion 2\"}, {\"nombre\": \"Exportar en PDF\", \"url_video\": \"https://www.youtube.com/embed/YrUKh0WwZQc\", \"descripcion\": \"Descripcion de la leccion 2\"}]}, {\"nombre\": \"Programador de contenido\", \"lecciones\": [{\"nombre\": \"Conectar cuentas\", \"url_video\": \"https://www.youtube.com/embed/YrUKh0WwZQc\", \"descripcion\": \"Descripcion de la leccion 1\"}, {\"nombre\": \"Programar y publicar\", \"url_video\": \"https://www.youtube.com/embed/YrUKh0WwZQc\", \"descripcion\": \"Descripcion de la leccion 2\"}, {\"nombre\": \"Redes sociales\", \"url_video\": \"https://www.youtube.com/embed/YrUKh0WwZQc\", \"descripcion\": \"Descripcion de la leccion 2\"}, {\"nombre\": \"Exportar recursos locales\", \"url_video\": \"https://www.youtube.com/embed/YrUKh0WwZQc\", \"descripcion\": \"Descripcion de la leccion 2\"}]}]'
    ),
    (
        6,
        6,
        '[{\"nombre\": \"Bienvenida\", \"lecciones\": [{\"nombre\": \"Introducción\", \"url_video\": \"https://www.youtube.com/embed/NyztKaM4eyw\", \"descripcion\": \"Que es adobe express y que podemos hacer con esta herramienta\"}]}, {\"nombre\": \"Diseño\", \"lecciones\": [{\"nombre\": \"Diseño generativo\", \"url_video\": \"https://www.youtube.com/embed/YrUKh0WwZQc\", \"descripcion\": \"Explora las maravillas del diseño generativo en Adobe Express. Aprende a utilizar algoritmos y patrones para crear obras de arte únicas y dinámicas que evolucionan con cada iteración. Desbloquea tu creatividad y descubre cómo la tecnología puede ser una fuente infinita de inspiración en el mundo del diseño.\"}, {\"nombre\": \"Trabajo con plantillas\", \"url_video\": \"https://www.youtube.com/embed/YrUKh0WwZQc\", \"descripcion\": \"Domina la eficiencia del diseño utilizando plantillas en Adobe Express. Descubre cómo optimizar tu flujo de trabajo al aprovechar una amplia variedad de plantillas predefinidas para crear contenido visualmente impactante. Desde presentaciones hasta publicaciones en redes sociales, aprende a personalizar y adaptar plantillas para satisfacer tus necesidades creativas de manera rápida y sencilla.\"}, {\"nombre\": \"Importación de recursos\", \"url_video\": \"https://www.youtube.com/embed/YrUKh0WwZQc\", \"descripcion\": \"Aprende a enriquecer tus proyectos en Adobe Express mediante la importación efectiva de recursos. Explora cómo incorporar imágenes, videos, iconos y más desde fuentes externas para ampliar tus opciones creativas. Domina las técnicas de gestión y organización de recursos para agilizar tu proceso de diseño y llevar tus creaciones al siguiente nivel.\"}, {\"nombre\": \"Herramientas de trabajo\", \"url_video\": \"https://www.youtube.com/embed/YrUKh0WwZQc\", \"descripcion\": \"Adéntrate en las poderosas herramientas de trabajo de Adobe Express. Descubre cómo aprovechar al máximo las diversas funciones y opciones disponibles en la aplicación para dar vida a tus ideas creativas. Desde la edición de imágenes hasta la creación de contenido multimedia, esta lección te proporcionará las habilidades esenciales para trabajar de manera eficiente y efectiva en Adobe Express.\"}]}, {\"nombre\": \"Video\", \"lecciones\": [{\"nombre\": \"Creación desde plantilla\", \"url_video\": \"https://www.youtube.com/embed/YrUKh0WwZQc\", \"descripcion\": \"Aprende a dar vida a tu visión creativa utilizando plantillas como punto de partida en Adobe Express. Esta lección te mostrará cómo personalizar y adaptar plantillas predefinidas para crear proyectos únicos y profesionales. Desde folletos hasta banners web, descubre cómo aprovechar al máximo las plantillas para agilizar tu proceso de diseño y obtener resultados impresionantes.\"}, {\"nombre\": \"Importación de recursos\", \"url_video\": \"https://www.youtube.com/embed/YrUKh0WwZQc\", \"descripcion\": \"Explora cómo enriquecer tus proyectos en Adobe Express a través de la importación de recursos externos. Aprende a incorporar imágenes, videos, fuentes y otros elementos para personalizar y ampliar tus creaciones. Esta lección te guiará en el proceso de importación, organización y optimización de recursos, permitiéndote llevar tus diseños a un nivel superior con una amplia variedad de opciones creativas a tu alcance.\"}, {\"nombre\": \"Creación de activos\", \"url_video\": \"https://www.youtube.com/embed/YrUKh0WwZQc\", \"descripcion\": \"En esta lección, aprenderás a utilizar Adobe Express para crear activos visuales impactantes. Exploraremos las herramientas y técnicas clave para diseñar gráficos, imágenes y elementos visuales que se pueden utilizar en una variedad de proyectos, desde presentaciones hasta redes sociales. ¡Desata tu creatividad y domina la creación de activos con Adobe Express!\"}, {\"nombre\": \"Narración y música\", \"url_video\": \"https://www.youtube.com/embed/YrUKh0WwZQc\", \"descripcion\": \"En esta emocionante lección, descubrirás cómo añadir narración y música a tus proyectos multimedia utilizando Adobe Express. Aprenderás a sincronizar audio con video, crear efectos sonoros, y combinar música y voz para dar vida a tus producciones. Desde videos informativos hasta presentaciones atractivas, esta lección te mostrará cómo dar un toque profesional a tus contenidos multimedia con Adobe Express.\"}, {\"nombre\": \"Exportación\", \"url_video\": \"https://www.youtube.com/embed/YrUKh0WwZQc\", \"descripcion\": \"En esta lección, te adentrarás en el proceso de exportación en Adobe Express. Aprenderás cómo preparar tus proyectos para compartirlos con el mundo, ya sea en línea o en diferentes formatos de archivo. Descubrirás las opciones de exportación, la optimización de configuraciones y cómo garantizar la máxima calidad en tus trabajos finales. Domina el arte de llevar tus creaciones de Adobe Express al público con esta lección esencial sobre exportación.\"}]}, {\"nombre\": \"Presentaciones\", \"lecciones\": [{\"nombre\": \"Creación de paginas\", \"url_video\": \"https://www.youtube.com/embed/YrUKh0WwZQc\", \"descripcion\": \"Descripcion de la leccion 1\"}, {\"nombre\": \"Elementos a añadir\", \"url_video\": \"https://www.youtube.com/embed/YrUKh0WwZQc\", \"descripcion\": \"Descripcion de la leccion 2\"}, {\"nombre\": \"Plantillas de color\", \"url_video\": \"https://www.youtube.com/embed/YrUKh0WwZQc\", \"descripcion\": \"Descripcion de la leccion 2\"}, {\"nombre\": \"Compartir paginas\", \"url_video\": \"https://www.youtube.com/embed/YrUKh0WwZQc\", \"descripcion\": \"Descripcion de la leccion 2\"}, {\"nombre\": \"Exportar en PDF\", \"url_video\": \"https://www.youtube.com/embed/YrUKh0WwZQc\", \"descripcion\": \"Descripcion de la leccion 2\"}]}, {\"nombre\": \"Programador de contenido\", \"lecciones\": [{\"nombre\": \"Conectar cuentas\", \"url_video\": \"https://www.youtube.com/embed/YrUKh0WwZQc\", \"descripcion\": \"Descripcion de la leccion 1\"}, {\"nombre\": \"Programar y publicar\", \"url_video\": \"https://www.youtube.com/embed/YrUKh0WwZQc\", \"descripcion\": \"Descripcion de la leccion 2\"}, {\"nombre\": \"Redes sociales\", \"url_video\": \"https://www.youtube.com/embed/YrUKh0WwZQc\", \"descripcion\": \"Descripcion de la leccion 2\"}, {\"nombre\": \"Exportar recursos locales\", \"url_video\": \"https://www.youtube.com/embed/YrUKh0WwZQc\", \"descripcion\": \"Descripcion de la leccion 2\"}]}]'
    ),
    (
        7,
        7,
        '[{\"nombre\": \"Bienvenida\", \"lecciones\": [{\"nombre\": \"Introducción\", \"url_video\": \"https://www.youtube.com/embed/NyztKaM4eyw\", \"descripcion\": \"Que es adobe express y que podemos hacer con esta herramienta\"}]}, {\"nombre\": \"Diseño\", \"lecciones\": [{\"nombre\": \"Diseño generativo\", \"url_video\": \"https://www.youtube.com/embed/YrUKh0WwZQc\", \"descripcion\": \"Explora las maravillas del diseño generativo en Adobe Express. Aprende a utilizar algoritmos y patrones para crear obras de arte únicas y dinámicas que evolucionan con cada iteración. Desbloquea tu creatividad y descubre cómo la tecnología puede ser una fuente infinita de inspiración en el mundo del diseño.\"}, {\"nombre\": \"Trabajo con plantillas\", \"url_video\": \"https://www.youtube.com/embed/YrUKh0WwZQc\", \"descripcion\": \"Domina la eficiencia del diseño utilizando plantillas en Adobe Express. Descubre cómo optimizar tu flujo de trabajo al aprovechar una amplia variedad de plantillas predefinidas para crear contenido visualmente impactante. Desde presentaciones hasta publicaciones en redes sociales, aprende a personalizar y adaptar plantillas para satisfacer tus necesidades creativas de manera rápida y sencilla.\"}, {\"nombre\": \"Importación de recursos\", \"url_video\": \"https://www.youtube.com/embed/YrUKh0WwZQc\", \"descripcion\": \"Aprende a enriquecer tus proyectos en Adobe Express mediante la importación efectiva de recursos. Explora cómo incorporar imágenes, videos, iconos y más desde fuentes externas para ampliar tus opciones creativas. Domina las técnicas de gestión y organización de recursos para agilizar tu proceso de diseño y llevar tus creaciones al siguiente nivel.\"}, {\"nombre\": \"Herramientas de trabajo\", \"url_video\": \"https://www.youtube.com/embed/YrUKh0WwZQc\", \"descripcion\": \"Adéntrate en las poderosas herramientas de trabajo de Adobe Express. Descubre cómo aprovechar al máximo las diversas funciones y opciones disponibles en la aplicación para dar vida a tus ideas creativas. Desde la edición de imágenes hasta la creación de contenido multimedia, esta lección te proporcionará las habilidades esenciales para trabajar de manera eficiente y efectiva en Adobe Express.\"}]}, {\"nombre\": \"Video\", \"lecciones\": [{\"nombre\": \"Creación desde plantilla\", \"url_video\": \"https://www.youtube.com/embed/YrUKh0WwZQc\", \"descripcion\": \"Aprende a dar vida a tu visión creativa utilizando plantillas como punto de partida en Adobe Express. Esta lección te mostrará cómo personalizar y adaptar plantillas predefinidas para crear proyectos únicos y profesionales. Desde folletos hasta banners web, descubre cómo aprovechar al máximo las plantillas para agilizar tu proceso de diseño y obtener resultados impresionantes.\"}, {\"nombre\": \"Importación de recursos\", \"url_video\": \"https://www.youtube.com/embed/YrUKh0WwZQc\", \"descripcion\": \"Explora cómo enriquecer tus proyectos en Adobe Express a través de la importación de recursos externos. Aprende a incorporar imágenes, videos, fuentes y otros elementos para personalizar y ampliar tus creaciones. Esta lección te guiará en el proceso de importación, organización y optimización de recursos, permitiéndote llevar tus diseños a un nivel superior con una amplia variedad de opciones creativas a tu alcance.\"}, {\"nombre\": \"Creación de activos\", \"url_video\": \"https://www.youtube.com/embed/YrUKh0WwZQc\", \"descripcion\": \"En esta lección, aprenderás a utilizar Adobe Express para crear activos visuales impactantes. Exploraremos las herramientas y técnicas clave para diseñar gráficos, imágenes y elementos visuales que se pueden utilizar en una variedad de proyectos, desde presentaciones hasta redes sociales. ¡Desata tu creatividad y domina la creación de activos con Adobe Express!\"}, {\"nombre\": \"Narración y música\", \"url_video\": \"https://www.youtube.com/embed/YrUKh0WwZQc\", \"descripcion\": \"En esta emocionante lección, descubrirás cómo añadir narración y música a tus proyectos multimedia utilizando Adobe Express. Aprenderás a sincronizar audio con video, crear efectos sonoros, y combinar música y voz para dar vida a tus producciones. Desde videos informativos hasta presentaciones atractivas, esta lección te mostrará cómo dar un toque profesional a tus contenidos multimedia con Adobe Express.\"}, {\"nombre\": \"Exportación\", \"url_video\": \"https://www.youtube.com/embed/YrUKh0WwZQc\", \"descripcion\": \"En esta lección, te adentrarás en el proceso de exportación en Adobe Express. Aprenderás cómo preparar tus proyectos para compartirlos con el mundo, ya sea en línea o en diferentes formatos de archivo. Descubrirás las opciones de exportación, la optimización de configuraciones y cómo garantizar la máxima calidad en tus trabajos finales. Domina el arte de llevar tus creaciones de Adobe Express al público con esta lección esencial sobre exportación.\"}]}, {\"nombre\": \"Presentaciones\", \"lecciones\": [{\"nombre\": \"Creación de paginas\", \"url_video\": \"https://www.youtube.com/embed/YrUKh0WwZQc\", \"descripcion\": \"Descripcion de la leccion 1\"}, {\"nombre\": \"Elementos a añadir\", \"url_video\": \"https://www.youtube.com/embed/YrUKh0WwZQc\", \"descripcion\": \"Descripcion de la leccion 2\"}, {\"nombre\": \"Plantillas de color\", \"url_video\": \"https://www.youtube.com/embed/YrUKh0WwZQc\", \"descripcion\": \"Descripcion de la leccion 2\"}, {\"nombre\": \"Compartir paginas\", \"url_video\": \"https://www.youtube.com/embed/YrUKh0WwZQc\", \"descripcion\": \"Descripcion de la leccion 2\"}, {\"nombre\": \"Exportar en PDF\", \"url_video\": \"https://www.youtube.com/embed/YrUKh0WwZQc\", \"descripcion\": \"Descripcion de la leccion 2\"}]}, {\"nombre\": \"Programador de contenido\", \"lecciones\": [{\"nombre\": \"Conectar cuentas\", \"url_video\": \"https://www.youtube.com/embed/YrUKh0WwZQc\", \"descripcion\": \"Descripcion de la leccion 1\"}, {\"nombre\": \"Programar y publicar\", \"url_video\": \"https://www.youtube.com/embed/YrUKh0WwZQc\", \"descripcion\": \"Descripcion de la leccion 2\"}, {\"nombre\": \"Redes sociales\", \"url_video\": \"https://www.youtube.com/embed/YrUKh0WwZQc\", \"descripcion\": \"Descripcion de la leccion 2\"}, {\"nombre\": \"Exportar recursos locales\", \"url_video\": \"https://www.youtube.com/embed/YrUKh0WwZQc\", \"descripcion\": \"Descripcion de la leccion 2\"}]}]'
    );
INSERT INTO `contenidocurso` (`id`, `curso_id`, `contenido`)
VALUES (
        8,
        8,
        '[{\"nombre\": \"Bienvenida\", \"lecciones\": [{\"nombre\": \"Introducción\", \"url_video\": \"https://www.youtube.com/embed/NyztKaM4eyw\", \"descripcion\": \"Que es adobe express y que podemos hacer con esta herramienta\"}]}, {\"nombre\": \"Diseño\", \"lecciones\": [{\"nombre\": \"Diseño generativo\", \"url_video\": \"https://www.youtube.com/embed/YrUKh0WwZQc\", \"descripcion\": \"Explora las maravillas del diseño generativo en Adobe Express. Aprende a utilizar algoritmos y patrones para crear obras de arte únicas y dinámicas que evolucionan con cada iteración. Desbloquea tu creatividad y descubre cómo la tecnología puede ser una fuente infinita de inspiración en el mundo del diseño.\"}, {\"nombre\": \"Trabajo con plantillas\", \"url_video\": \"https://www.youtube.com/embed/YrUKh0WwZQc\", \"descripcion\": \"Domina la eficiencia del diseño utilizando plantillas en Adobe Express. Descubre cómo optimizar tu flujo de trabajo al aprovechar una amplia variedad de plantillas predefinidas para crear contenido visualmente impactante. Desde presentaciones hasta publicaciones en redes sociales, aprende a personalizar y adaptar plantillas para satisfacer tus necesidades creativas de manera rápida y sencilla.\"}, {\"nombre\": \"Importación de recursos\", \"url_video\": \"https://www.youtube.com/embed/YrUKh0WwZQc\", \"descripcion\": \"Aprende a enriquecer tus proyectos en Adobe Express mediante la importación efectiva de recursos. Explora cómo incorporar imágenes, videos, iconos y más desde fuentes externas para ampliar tus opciones creativas. Domina las técnicas de gestión y organización de recursos para agilizar tu proceso de diseño y llevar tus creaciones al siguiente nivel.\"}, {\"nombre\": \"Herramientas de trabajo\", \"url_video\": \"https://www.youtube.com/embed/YrUKh0WwZQc\", \"descripcion\": \"Adéntrate en las poderosas herramientas de trabajo de Adobe Express. Descubre cómo aprovechar al máximo las diversas funciones y opciones disponibles en la aplicación para dar vida a tus ideas creativas. Desde la edición de imágenes hasta la creación de contenido multimedia, esta lección te proporcionará las habilidades esenciales para trabajar de manera eficiente y efectiva en Adobe Express.\"}]}, {\"nombre\": \"Video\", \"lecciones\": [{\"nombre\": \"Creación desde plantilla\", \"url_video\": \"https://www.youtube.com/embed/YrUKh0WwZQc\", \"descripcion\": \"Aprende a dar vida a tu visión creativa utilizando plantillas como punto de partida en Adobe Express. Esta lección te mostrará cómo personalizar y adaptar plantillas predefinidas para crear proyectos únicos y profesionales. Desde folletos hasta banners web, descubre cómo aprovechar al máximo las plantillas para agilizar tu proceso de diseño y obtener resultados impresionantes.\"}, {\"nombre\": \"Importación de recursos\", \"url_video\": \"https://www.youtube.com/embed/YrUKh0WwZQc\", \"descripcion\": \"Explora cómo enriquecer tus proyectos en Adobe Express a través de la importación de recursos externos. Aprende a incorporar imágenes, videos, fuentes y otros elementos para personalizar y ampliar tus creaciones. Esta lección te guiará en el proceso de importación, organización y optimización de recursos, permitiéndote llevar tus diseños a un nivel superior con una amplia variedad de opciones creativas a tu alcance.\"}, {\"nombre\": \"Creación de activos\", \"url_video\": \"https://www.youtube.com/embed/YrUKh0WwZQc\", \"descripcion\": \"En esta lección, aprenderás a utilizar Adobe Express para crear activos visuales impactantes. Exploraremos las herramientas y técnicas clave para diseñar gráficos, imágenes y elementos visuales que se pueden utilizar en una variedad de proyectos, desde presentaciones hasta redes sociales. ¡Desata tu creatividad y domina la creación de activos con Adobe Express!\"}, {\"nombre\": \"Narración y música\", \"url_video\": \"https://www.youtube.com/embed/YrUKh0WwZQc\", \"descripcion\": \"En esta emocionante lección, descubrirás cómo añadir narración y música a tus proyectos multimedia utilizando Adobe Express. Aprenderás a sincronizar audio con video, crear efectos sonoros, y combinar música y voz para dar vida a tus producciones. Desde videos informativos hasta presentaciones atractivas, esta lección te mostrará cómo dar un toque profesional a tus contenidos multimedia con Adobe Express.\"}, {\"nombre\": \"Exportación\", \"url_video\": \"https://www.youtube.com/embed/YrUKh0WwZQc\", \"descripcion\": \"En esta lección, te adentrarás en el proceso de exportación en Adobe Express. Aprenderás cómo preparar tus proyectos para compartirlos con el mundo, ya sea en línea o en diferentes formatos de archivo. Descubrirás las opciones de exportación, la optimización de configuraciones y cómo garantizar la máxima calidad en tus trabajos finales. Domina el arte de llevar tus creaciones de Adobe Express al público con esta lección esencial sobre exportación.\"}]}, {\"nombre\": \"Presentaciones\", \"lecciones\": [{\"nombre\": \"Creación de paginas\", \"url_video\": \"https://www.youtube.com/embed/YrUKh0WwZQc\", \"descripcion\": \"Descripcion de la leccion 1\"}, {\"nombre\": \"Elementos a añadir\", \"url_video\": \"https://www.youtube.com/embed/YrUKh0WwZQc\", \"descripcion\": \"Descripcion de la leccion 2\"}, {\"nombre\": \"Plantillas de color\", \"url_video\": \"https://www.youtube.com/embed/YrUKh0WwZQc\", \"descripcion\": \"Descripcion de la leccion 2\"}, {\"nombre\": \"Compartir paginas\", \"url_video\": \"https://www.youtube.com/embed/YrUKh0WwZQc\", \"descripcion\": \"Descripcion de la leccion 2\"}, {\"nombre\": \"Exportar en PDF\", \"url_video\": \"https://www.youtube.com/embed/YrUKh0WwZQc\", \"descripcion\": \"Descripcion de la leccion 2\"}]}, {\"nombre\": \"Programador de contenido\", \"lecciones\": [{\"nombre\": \"Conectar cuentas\", \"url_video\": \"https://www.youtube.com/embed/YrUKh0WwZQc\", \"descripcion\": \"Descripcion de la leccion 1\"}, {\"nombre\": \"Programar y publicar\", \"url_video\": \"https://www.youtube.com/embed/YrUKh0WwZQc\", \"descripcion\": \"Descripcion de la leccion 2\"}, {\"nombre\": \"Redes sociales\", \"url_video\": \"https://www.youtube.com/embed/YrUKh0WwZQc\", \"descripcion\": \"Descripcion de la leccion 2\"}, {\"nombre\": \"Exportar recursos locales\", \"url_video\": \"https://www.youtube.com/embed/YrUKh0WwZQc\", \"descripcion\": \"Descripcion de la leccion 2\"}]}]'
    ),
    (
        9,
        9,
        '[{\"nombre\": \"Bienvenida\", \"lecciones\": [{\"nombre\": \"Introducción\", \"url_video\": \"https://www.youtube.com/embed/NyztKaM4eyw\", \"descripcion\": \"Que es adobe express y que podemos hacer con esta herramienta\"}]}, {\"nombre\": \"Diseño\", \"lecciones\": [{\"nombre\": \"Diseño generativo\", \"url_video\": \"https://www.youtube.com/embed/YrUKh0WwZQc\", \"descripcion\": \"Explora las maravillas del diseño generativo en Adobe Express. Aprende a utilizar algoritmos y patrones para crear obras de arte únicas y dinámicas que evolucionan con cada iteración. Desbloquea tu creatividad y descubre cómo la tecnología puede ser una fuente infinita de inspiración en el mundo del diseño.\"}, {\"nombre\": \"Trabajo con plantillas\", \"url_video\": \"https://www.youtube.com/embed/YrUKh0WwZQc\", \"descripcion\": \"Domina la eficiencia del diseño utilizando plantillas en Adobe Express. Descubre cómo optimizar tu flujo de trabajo al aprovechar una amplia variedad de plantillas predefinidas para crear contenido visualmente impactante. Desde presentaciones hasta publicaciones en redes sociales, aprende a personalizar y adaptar plantillas para satisfacer tus necesidades creativas de manera rápida y sencilla.\"}, {\"nombre\": \"Importación de recursos\", \"url_video\": \"https://www.youtube.com/embed/YrUKh0WwZQc\", \"descripcion\": \"Aprende a enriquecer tus proyectos en Adobe Express mediante la importación efectiva de recursos. Explora cómo incorporar imágenes, videos, iconos y más desde fuentes externas para ampliar tus opciones creativas. Domina las técnicas de gestión y organización de recursos para agilizar tu proceso de diseño y llevar tus creaciones al siguiente nivel.\"}, {\"nombre\": \"Herramientas de trabajo\", \"url_video\": \"https://www.youtube.com/embed/YrUKh0WwZQc\", \"descripcion\": \"Adéntrate en las poderosas herramientas de trabajo de Adobe Express. Descubre cómo aprovechar al máximo las diversas funciones y opciones disponibles en la aplicación para dar vida a tus ideas creativas. Desde la edición de imágenes hasta la creación de contenido multimedia, esta lección te proporcionará las habilidades esenciales para trabajar de manera eficiente y efectiva en Adobe Express.\"}]}, {\"nombre\": \"Video\", \"lecciones\": [{\"nombre\": \"Creación desde plantilla\", \"url_video\": \"https://www.youtube.com/embed/YrUKh0WwZQc\", \"descripcion\": \"Aprende a dar vida a tu visión creativa utilizando plantillas como punto de partida en Adobe Express. Esta lección te mostrará cómo personalizar y adaptar plantillas predefinidas para crear proyectos únicos y profesionales. Desde folletos hasta banners web, descubre cómo aprovechar al máximo las plantillas para agilizar tu proceso de diseño y obtener resultados impresionantes.\"}, {\"nombre\": \"Importación de recursos\", \"url_video\": \"https://www.youtube.com/embed/YrUKh0WwZQc\", \"descripcion\": \"Explora cómo enriquecer tus proyectos en Adobe Express a través de la importación de recursos externos. Aprende a incorporar imágenes, videos, fuentes y otros elementos para personalizar y ampliar tus creaciones. Esta lección te guiará en el proceso de importación, organización y optimización de recursos, permitiéndote llevar tus diseños a un nivel superior con una amplia variedad de opciones creativas a tu alcance.\"}, {\"nombre\": \"Creación de activos\", \"url_video\": \"https://www.youtube.com/embed/YrUKh0WwZQc\", \"descripcion\": \"En esta lección, aprenderás a utilizar Adobe Express para crear activos visuales impactantes. Exploraremos las herramientas y técnicas clave para diseñar gráficos, imágenes y elementos visuales que se pueden utilizar en una variedad de proyectos, desde presentaciones hasta redes sociales. ¡Desata tu creatividad y domina la creación de activos con Adobe Express!\"}, {\"nombre\": \"Narración y música\", \"url_video\": \"https://www.youtube.com/embed/YrUKh0WwZQc\", \"descripcion\": \"En esta emocionante lección, descubrirás cómo añadir narración y música a tus proyectos multimedia utilizando Adobe Express. Aprenderás a sincronizar audio con video, crear efectos sonoros, y combinar música y voz para dar vida a tus producciones. Desde videos informativos hasta presentaciones atractivas, esta lección te mostrará cómo dar un toque profesional a tus contenidos multimedia con Adobe Express.\"}, {\"nombre\": \"Exportación\", \"url_video\": \"https://www.youtube.com/embed/YrUKh0WwZQc\", \"descripcion\": \"En esta lección, te adentrarás en el proceso de exportación en Adobe Express. Aprenderás cómo preparar tus proyectos para compartirlos con el mundo, ya sea en línea o en diferentes formatos de archivo. Descubrirás las opciones de exportación, la optimización de configuraciones y cómo garantizar la máxima calidad en tus trabajos finales. Domina el arte de llevar tus creaciones de Adobe Express al público con esta lección esencial sobre exportación.\"}]}, {\"nombre\": \"Presentaciones\", \"lecciones\": [{\"nombre\": \"Creación de paginas\", \"url_video\": \"https://www.youtube.com/embed/YrUKh0WwZQc\", \"descripcion\": \"Descripcion de la leccion 1\"}, {\"nombre\": \"Elementos a añadir\", \"url_video\": \"https://www.youtube.com/embed/YrUKh0WwZQc\", \"descripcion\": \"Descripcion de la leccion 2\"}, {\"nombre\": \"Plantillas de color\", \"url_video\": \"https://www.youtube.com/embed/YrUKh0WwZQc\", \"descripcion\": \"Descripcion de la leccion 2\"}, {\"nombre\": \"Compartir paginas\", \"url_video\": \"https://www.youtube.com/embed/YrUKh0WwZQc\", \"descripcion\": \"Descripcion de la leccion 2\"}, {\"nombre\": \"Exportar en PDF\", \"url_video\": \"https://www.youtube.com/embed/YrUKh0WwZQc\", \"descripcion\": \"Descripcion de la leccion 2\"}]}, {\"nombre\": \"Programador de contenido\", \"lecciones\": [{\"nombre\": \"Conectar cuentas\", \"url_video\": \"https://www.youtube.com/embed/YrUKh0WwZQc\", \"descripcion\": \"Descripcion de la leccion 1\"}, {\"nombre\": \"Programar y publicar\", \"url_video\": \"https://www.youtube.com/embed/YrUKh0WwZQc\", \"descripcion\": \"Descripcion de la leccion 2\"}, {\"nombre\": \"Redes sociales\", \"url_video\": \"https://www.youtube.com/embed/YrUKh0WwZQc\", \"descripcion\": \"Descripcion de la leccion 2\"}, {\"nombre\": \"Exportar recursos locales\", \"url_video\": \"https://www.youtube.com/embed/YrUKh0WwZQc\", \"descripcion\": \"Descripcion de la leccion 2\"}]}]'
    );
-- --------------------------------------------------------
--
-- Estructura de tabla para la tabla `curso`
--
CREATE TABLE `curso` (
    `id` int(11) NOT NULL,
    `nombre` varchar(255) NOT NULL,
    `descripcion` text NOT NULL,
    `url_imagen` varchar(255) DEFAULT NULL,
    `nombre_docente` varchar(255) NOT NULL,
    `precio` decimal(10, 2) NOT NULL,
    `nombre_certificado` varchar(255) NOT NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8 COLLATE = utf8_unicode_ci;
--
-- Volcado de datos para la tabla `curso`
--
INSERT INTO `curso` (
        `id`,
        `nombre`,
        `descripcion`,
        `url_imagen`,
        `nombre_docente`,
        `precio`,
        `nombre_certificado`
    )
VALUES (
        1,
        'Aprende a crear contenido con Adobe Express',
        'Sum?rgete en el mundo de la creatividad digital con nuestro curso de aprendizaje en l?nea, dise?ado para ense?arte c?mo crear contenido impactante utilizando Adobe Express.',
        'https://cursosadobe.com/public/tools/express.jpg',
        'Wilder Bola?os',
        0.00,
        'Adobe Express'
    ),
    (
        2,
        'Sé un artista digital con Photoshop',
        'Sumérgete en el mundo de la creatividad digital con nuestro curso de aprendizaje en línea, diseñado para enseñarte cómo crear contenido impactante utilizando Adobe Express.',
        'https://cursosadobe.com/public/tools/photoshop.jpg',
        'Leosky',
        600.00,
        'Adobe Express'
    ),
    (
        3,
        'Dibujando con Illustrator',
        'Sumérgete en el mundo de la creatividad digital con nuestro curso de aprendizaje en línea, diseñado para enseñarte cómo crear contenido impactante utilizando Adobe Express.',
        'https://cursosadobe.com/public/tools/illustrator.jpg',
        'Leosky',
        600.00,
        'Adobe Express'
    ),
    (
        4,
        'Creando productos editoriales con Indesign',
        'Sumérgete en el mundo de la creatividad digital con nuestro curso de aprendizaje en línea, diseñado para enseñarte cómo crear contenido impactante utilizando Adobe Express.',
        'https://cursosadobe.com/public/tools/indesign.jpg',
        'Leosky',
        600.00,
        'Adobe Express'
    ),
    (
        5,
        'Edita video con Adobe Premiere',
        'Sumérgete en el mundo de la creatividad digital con nuestro curso de aprendizaje en línea, diseñado para enseñarte cómo crear contenido impactante utilizando Adobe Express.',
        'https://cursosadobe.com/public/tools/premiere.jpg',
        'Leosky',
        600.00,
        'Adobe Express'
    ),
    (
        6,
        'Efectos especiales en Adobe After Effects',
        'Sumérgete en el mundo de la creatividad digital con nuestro curso de aprendizaje en línea, diseñado para enseñarte cómo crear contenido impactante utilizando Adobe Express.',
        'https://cursosadobe.com/public/tools/after.jpg',
        'Leosky',
        600.00,
        'Adobe Express'
    ),
    (
        7,
        'Composición de Audio con Audition',
        'Sumérgete en el mundo de la creatividad digital con nuestro curso de aprendizaje en línea, diseñado para enseñarte cómo crear contenido impactante utilizando Adobe Express.',
        'https://cursosadobe.com/public/tools/audition.jpg',
        'Leosky',
        600.00,
        'Adobe Express'
    ),
    (
        8,
        'Documentos inteligentes con Acrobat',
        'Sumérgete en el mundo de la creatividad digital con nuestro curso de aprendizaje en línea, diseñado para enseñarte cómo crear contenido impactante utilizando Adobe Express.',
        'https://cursosadobe.com/public/tools/acrobat.jpg',
        'Leosky',
        600.00,
        'Adobe Express'
    ),
    (
        9,
        'Digitales con Adobe Sign',
        'Sumérgete en el mundo de la creatividad digital con nuestro curso de aprendizaje en línea, diseñado para enseñarte cómo crear contenido impactante utilizando Adobe Express.',
        'https://cursosadobe.com/public/tools/sign.jpg',
        'Leosky',
        600.00,
        'Adobe Express'
    );
-- --------------------------------------------------------
--
-- Estructura de tabla para la tabla `cursocliente`
--
CREATE TABLE `cursocliente` (
    `id` int(11) NOT NULL,
    `id_curso` int(11) DEFAULT NULL,
    `id_cliente` int(11) DEFAULT NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8 COLLATE = utf8_unicode_ci;
--
-- Volcado de datos para la tabla `cursocliente`
--
INSERT INTO `cursocliente` (`id`, `id_curso`, `id_cliente`)
VALUES (1, 1, 1);
-- --------------------------------------------------------
--
-- Estructura de tabla para la tabla `token_dispositivos`
--
CREATE TABLE `token_dispositivos` (
    `id` int(11) NOT NULL,
    `id_usuario` int(11) NOT NULL,
    `token` char(6) NOT NULL,
    `fechaCreacion` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;
--
-- Volcado de datos para la tabla `token_dispositivos`
--
INSERT INTO `token_dispositivos` (`id`, `id_usuario`, `token`, `fechaCreacion`)
VALUES (1, 7, '0SYKSB', '2023-10-11 18:32:24'),
    (2, 7, 'M75YUH', '2023-10-11 18:33:08'),
    (3, 7, 'RTQE0I', '2023-10-11 18:38:59'),
    (4, 7, 'S0RFG9', '2023-10-11 18:40:30'),
    (5, 7, 'QGOJAL', '2023-10-11 18:42:49'),
    (6, 7, 'A6PC9U', '2023-10-11 18:43:40'),
    (7, 7, 'WSQ84O', '2023-10-11 18:44:34'),
    (8, 7, 'H9Q62Y', '2023-10-11 18:50:04'),
    (9, 7, '5TIS8K', '2023-10-11 18:53:30'),
    (10, 7, 'Y8CMIH', '2023-10-11 18:54:04'),
    (11, 7, 'XDRT98', '2023-10-11 19:01:12'),
    (12, 7, 'V1YXQD', '2023-10-11 19:03:03'),
    (13, 7, 'HXVPMM', '2023-10-11 19:12:09'),
    (14, 7, 'Z4KLEL', '2023-10-11 19:18:54'),
    (15, 7, 'WBPVDA', '2023-10-11 19:26:03'),
    (16, 7, 'GZRJPM', '2023-10-11 19:29:10'),
    (17, 7, 'BP9HLP', '2023-10-11 19:30:41'),
    (18, 7, 'WRMLXZ', '2023-10-11 19:31:27');
-- --------------------------------------------------------
--
-- Estructura de tabla para la tabla `usuario`
--
CREATE TABLE `usuario` (
    `id` int(11) NOT NULL,
    `id_cliente` int(11) NOT NULL,
    `nombre` varchar(255) NOT NULL,
    `email` varchar(255) NOT NULL,
    `empresa` varchar(255) NOT NULL,
    `ip` varchar(255) DEFAULT NULL,
    `telefono` varchar(20) DEFAULT NULL,
    `dispositivos` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`dispositivos`)),
    `cargo` varchar(255) DEFAULT NULL,
    `verificado` tinyint(1) DEFAULT 0
) ENGINE = InnoDB DEFAULT CHARSET = utf8 COLLATE = utf8_unicode_ci;
--
-- Volcado de datos para la tabla `usuario`
--
INSERT INTO `usuario` (
        `id`,
        `id_cliente`,
        `nombre`,
        `email`,
        `empresa`,
        `ip`,
        `telefono`,
        `dispositivos`,
        `cargo`,
        `verificado`
    )
VALUES (
        7,
        1,
        'Juan Andres Morales',
        'juanskate326@gmail.com',
        'BANCO CAJA SOCIAL',
        '::1',
        '+573196458411',
        '[\"FTFP3J\",\"M75-YUH\",\"RTQ-E0I\",\"S0R-FG9\",\"QGO-JAL\",\"A6P-C9U\",\"H9Q-62Y\",\"Y8C-MIH\",\"V1Y-XQD\",\"GZR-JPM\",\"WRM-LXZ\"]',
        'Developer',
        1
    );
--
-- Índices para tablas volcadas
--
--
-- Indices de la tabla `cliente`
--
ALTER TABLE `cliente`
ADD PRIMARY KEY (`id`);
--
-- Indices de la tabla `contenidocurso`
--
ALTER TABLE `contenidocurso`
ADD PRIMARY KEY (`id`),
    ADD KEY `curso_id` (`curso_id`);
--
-- Indices de la tabla `curso`
--
ALTER TABLE `curso`
ADD PRIMARY KEY (`id`);
--
-- Indices de la tabla `cursocliente`
--
ALTER TABLE `cursocliente`
ADD PRIMARY KEY (`id`),
    ADD KEY `id_curso` (`id_curso`),
    ADD KEY `id_cliente` (`id_cliente`);
--
-- Indices de la tabla `token_dispositivos`
--
ALTER TABLE `token_dispositivos`
ADD PRIMARY KEY (`id`);
--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
ADD PRIMARY KEY (`id`),
    ADD KEY `id_cliente` (`id_cliente`);
--
-- AUTO_INCREMENT de las tablas volcadas
--
--
-- AUTO_INCREMENT de la tabla `cliente`
--
ALTER TABLE `cliente`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,
    AUTO_INCREMENT = 2;
--
-- AUTO_INCREMENT de la tabla `contenidocurso`
--
ALTER TABLE `contenidocurso`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,
    AUTO_INCREMENT = 10;
--
-- AUTO_INCREMENT de la tabla `curso`
--
ALTER TABLE `curso`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,
    AUTO_INCREMENT = 10;
--
-- AUTO_INCREMENT de la tabla `cursocliente`
--
ALTER TABLE `cursocliente`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,
    AUTO_INCREMENT = 2;
--
-- AUTO_INCREMENT de la tabla `token_dispositivos`
--
ALTER TABLE `token_dispositivos`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,
    AUTO_INCREMENT = 19;
--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,
    AUTO_INCREMENT = 8;
COMMIT;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */
;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */
;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */
;