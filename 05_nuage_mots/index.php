<!-- <?php include './logs/tracage.inc.php' ?> -->
<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <meta name="description" content="Word Cloud Generator">
    <meta name="author" content="jeros">
    <title>Faire des nuages de mots</title>
    <link rel="stylesheet" href="./05_nuage_mots/css/style.css">

    <!-- Google tag (gtag.js) 21/12/2023-->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-7V3VDCF3PS"></script>
    <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());

    gtag('config', 'G-7V3VDCF3PS');
</script>
</head>

<body>
    <div id="vis"></div>

    <form id="form">
        <p style="position: absolute; right: 0; top: 0" id="status"></p>
        <div style="text-align: center">
            <div id="presets"></div>
            <div id="custom-area">
                <p><label for="text">Coller votre texte ci-dessous!</label>
                    <p><textarea id="text">
			 Créer un SIG dans son intégralité, développer des applications informatiques
			complexes dans un environnement WEB (Google maps, Géoportail, Leaflet,
			Géoserver…),
			Exploiter des systèmes de données à composantes géographiques, en
			environnement WEB et/ou non WEB, afin de produire des outils d’aide à la
			décision, tels que cartes thématiques, analyses cartographiques et statistiques,
			 Pratiquer les logiciels de SIG les plus courants (ArcGis, QGis, MapInfo, FME,
			GeoBusiness…),
			Administrer un serveur web cartographique,
			Maîtriser les différentes étapes de gestion de projet pour la conception d’une
			application informatique.
			 Cartographie et sémiologie graphique
			Introduction à l’aménagement du territoire
			Introduction géographie générale : environnements et sociétés
			Applications
			Introduction à la télédétection
			Conception et développement d’applications SIG
			Conception et programmation de Bases de données
			Programmation dans les SIG
			Conception et développement d’applications SIG WEB
			Programmation WEB de Bases de données
			Programmation WEB de SIG
			Principes d’administration d’un serveur WEB
			Statistique
			Exploratoire simple
			Analyse de données
			SIG
			Logiciels SIG  pratique de base
			Logiciels SIG  pratique avancée
			Solutions logicielles WEB des principaux éditeurs
			Formation générale
			Techniques de communication
			Anglais  remise à niveau
			Economie régionale
			Anglais  perfectionneme
			Développement local
			
			Cette formation est proposée par l’IUT STID de Carcassonne rattaché à l’Université de Perpignan.
			Elle est accessible à des étudiants qui ont obtenu un diplôme de niveau BAC+2. Nous  accueillons des étudiants issus de domaines très variés (informatique, statistique, gestion de l’eau, gestion de la forêt, géomètres, géographes,…)
			Pour les profils non informaticiens, une mise à niveau de 2 semaines est mise en place avant le début de la formation.
			Elle se déroule en alternance rythmée par 3 périodes à l’IUT et 3 périodes en entreprise.
			Le statut des auditeurs peut être étudiant ou salarié par le biais d’un contrat de professionnalisation ou d’un contrat d’apprentissage.
			La formation permet aux auditeurs d’analyser et modéliser un domaine de gestion avec une dimension cartographique en vue de produire un système d’information efficace.
			Nous y abordons des notions de gestion de réseaux informatiques et d’administration.
			La programmation prend une part importante notamment en environnement WEB  (PHP, javascript,  POSTGRESQL/POSTGIS, APIs de programmation de google, bing, AJAX,…),
			Les enseignements généraux sont orientés autour de la géomatique tant en géographie, économie et statistique afin de produire des cartes pertinentes, interactives dans un environnement WEB.
			Les logiciels classiques ne sont pas oubliés avec MapInfo et ArcGis ainsi que la partie programmation dans ces environnements avec MapBasic et Python.
			Les projets tuteurés sont un moment privilégié pour mettre en œuvre toutes les compétences acquises de manière transversale.
			Notre équipe pédagogique est à l’écoute en permanence des étudiants. Ils sont suivis par le biais d’une liste de diffusion tout au long de leur formation.
			Pour l’accueil en entreprise nous avons un réseau fort de 12 années de développement (avec notre licence TIG) dans lequel nous trouvons beaucoup de collectivités territoriales mais aussi des structures variés (SDIS, CG, communautés de communes et d’agglomérations, VEREMES, ESRI, Total, ERDF, GRDF,…)
			A l’issue d’enquêtes annuelles, nous remarquons qu’une proportion importante d’étudiants trouve rapidement un emploi dans le domaine de la géomatique.

    
        </textarea>
                        <button id="go" type="submit">Go!</button>
            </div>
        </div>

        <hr>

        <div style="float: right; text-align: right">
            <p><label for="max">Nombre de mots:</label> <input type="number" value="250" min="1" id="max"></p>
            <p><label for="per-line"><input type="checkbox" id="per-line">  Un mot par ligne</label></p>
            <!--<p><label for="colours">Colours:</label> <a href="#" id="random-palette">get random palette</a>-->
            <p><label>Téléchargement: </label><button id="download-svg">SVG</button></p>
        
            <!-- |
        <a id="download-png" href="#">PNG</a>-->
        </div>

        <div style="float: left">
            <p>
                <label>Spirale:</label>
                <label for="archimedean"><input type="radio" name="spiral" id="archimedean" value="archimedean"
                        checked="checked"> Archimédien</label>
                <label for="rectangular"><input type="radio" name="spiral" id="rectangular" value="rectangular">
                    Rectangulaire</label>
            </p>
            <p><label for="scale">Scale:</label>
                <label for="scale-log"><input type="radio" name="scale" id="scale-log" value="log" checked="checked">
                    log n</label>
                <label for="scale-sqrt"><input type="radio" name="scale" id="scale-sqrt" value="sqrt"> √n</label>
                <label for="scale-linear"><input type="radio" name="scale" id="scale-linear" value="linear">
                    n</label>
            </p>
            <p><label for="font">Font:</label> <input type="text" id="font" value="Impact"></p>
        </div>

        <div id="angles">
            <p><input type="number" id="angle-count" value="5" min="1"> <label for="angle-count">Orientations</label>
                <label for="angle-from">de</label> <input type="number" id="angle-from" value="-60" min="-90"
                    max="90"> °
                <label for="angle-to">à</label> <input type="number" id="angle-to" value="60" min="-90" max="90"> °
            </p>
        </div>

        <hr style="clear: both">

        <!-- <p style="float: right"><a href="about/">How the Word Cloud Generator Works</a>.</p>
        <p style="float: left">Copyright &copy; 
            <a href="http://www.jasondavies.com/">Jason Davies</a> | 
            <a href="../privacy/">Privacy Policy</a>. The generated word clouds may be used for any purpose.
        </p> -->

    </form>

    <ins class="adsbygoogle" style="display:inline-block;width:728px;height:90px;margin-left:116px"
        data-ad-client="ca-pub-2911491153890039" data-ad-slot="2029654015">
    </ins>

    <script src="./05_nuage_mots/js/d3.min.js"></script>
    <script src="./05_nuage_mots/js/cloud.min.js"></script>
    <script async src="./05_nuage_mots/js/adsbygoogle.min.js"></script>
    <script>
        window.google_analytics_uacct = "UA-54563-3";
        var _gaq = _gaq || [];
        _gaq.push(['_setAccount', 'UA-54563-3']);
        _gaq.push(['_trackPageview']);
        setTimeout(function () {
            var ga = document.createElement('script');
            ga.type = 'text/javascript';
            ga.async = true;
            ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') +
                '.google-analytics.com/ga.js';
            (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(
                ga);
        }, 1);
        (adsbygoogle = window.adsbygoogle || []).push({});
    </script>
</body>

</html>