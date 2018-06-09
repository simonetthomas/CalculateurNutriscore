/* TODO :
- Prendre en compte les cas particuliers 
    - eau
- Vérif des valeurs entrées (positives, ratio < 100 etc)
    - Avertissements ?
- Champs mat grasse : modifier la taille au lieu de display:none
- Graduations et légende graphe
- Ajouter énergie en kcal ?
- Pages annexes : À propos
- FAQ : bouton pour tout déplier / replier
*/

// Modes : general, matieres_grasses, fromages, boissons, eau
// Par défaut : mode "général" pour les produits hors cas particuliers
var mode = "general";

/* * * CHANGEMENTS DE MODES * * */

/* Passage en produit "général" */
function bouton_general(){
    if (mode != "general") {
        switch (mode){
            case "matieres_grasses" : // On était en matières grasses
                cacher_matieres_grasses();
                break;
            case "fromages" :   // On était en fromages
                document.getElementById("bouton_fromages").classList.remove("mode_actif");
                break;
            case "boissons" : // On était en boissons
                document.getElementById("bouton_boissons").classList.remove("mode_actif");
                break;
            case "eau" : // On était en eau
                document.getElementById("bouton_eau").classList.remove("mode_actif");
                break;
        }
        document.getElementById("bouton_general").classList.add("mode_actif");
        mode = "general";
        calcul_energie();
        calcul_acides_gras_satures();
        calcul_sucres();
        calcul_fruits();
        canvas_couleurs();
    }
}

/* Passage en produit "matières grasses" (huiles, beurre, etc.) */
function bouton_matieres_grasses(){
    if (mode != "matieres_grasses") {
        switch (mode){
            case "general" :    // On était en général
                document.getElementById("bouton_general").classList.remove("mode_actif");
                break;
            case "fromages" :   // On était en fromages
                document.getElementById("bouton_fromages").classList.remove("mode_actif");
                break;
            case "boissons" :   // On était en boissons
                document.getElementById("bouton_boissons").classList.remove("mode_actif");
                break;
            case "eau" : // On était en eau
                document.getElementById("bouton_eau").classList.remove("mode_actif");
                break;
        }
        // Activation du bouton "matières grasses"
        document.getElementById("bouton_matieres_grasses").classList.add("mode_actif");
        
        // Affichage des groupes "matières grasses" et masquage des points des "acides gras saturés"
        document.getElementById("groupe_matieres_grasses").classList.remove("hidden");
        document.getElementById("groupe_ratio_acides_gras_satures").classList.remove("hidden");
        
        // Affichage des points de "ratio acides gras saturés"
        document.getElementById("acides_gras_satures_points").classList.add("hidden");
        
        mode = "matieres_grasses";
        calcul_energie();
        calcul_acides_gras_satures();
        calcul_fruits();
        canvas_couleurs();
    }
}

/* Passage en produit "fromages" */
function bouton_fromages(){
    if (mode != "fromages"){
        switch (mode){
            case "general" :
                document.getElementById("bouton_general").classList.remove("mode_actif");
                break;
            case "matieres_grasses" :
                cacher_matieres_grasses();
                break;
            case "boissons" :
                document.getElementById("bouton_boissons").classList.remove("mode_actif");
                break;
            case "eau" :
                document.getElementById("bouton_eau").classList.remove("mode_actif");
                break;
        }
        document.getElementById("bouton_fromages").classList.add("mode_actif");
        mode = "fromages";
        calcul_energie();
        calcul_sucres();
        calcul_proteines();
        calcul_fruits();
        canvas_couleurs();
    }
}

/* Passage en mode "boissons" */
function bouton_boissons(){
    if (mode != "boissons"){
        switch(mode){
            case "general" :
                document.getElementById("bouton_general").classList.remove("mode_actif");
                break;
            case "matieres_grasses" : 
                cacher_matieres_grasses();
                break;
            case "fromages" :
                document.getElementById("bouton_fromages").classList.remove("mode_actif");
                break;
            case "eau" :
                document.getElementById("bouton_eau").classList.remove("mode_actif");
                break;
        }
        document.getElementById("bouton_boissons").classList.add("mode_actif");
        mode = "boissons";
        calcul_energie();
        calcul_acides_gras_satures();
        calcul_sucres();
        calcul_fruits();
        canvas_couleurs();
    }
}

/* Passage en mode "eau" */
function bouton_eau(){
    // TODO
    if (mode != "eau"){
        switch(mode){
            case "general":
                document.getElementById("bouton_general").classList.remove("mode_actif");
                break;
            case "matieres_grasses":
                document.getElementById("bouton_matieres_grasses").classList.remove("mode_actif");
                break;
            case "fromages":
                document.getElementById("bouton_fromages").classList.remove("mode_actif");
                break;
            case "boissons":
                document.getElementById("bouton_boissons").classList.remove("mode_actif");
                break;
        }
        document.getElementById("bouton_eau").classList.add("mode_actif");
        mode = "eau";
        calcul_eau();
    }
}


/* Masquage du groupe matières grasses */
function cacher_matieres_grasses(){
    // Désactivation du bouton "matières grasses"
    document.getElementById("bouton_matieres_grasses").classList.remove("mode_actif");
    
    // Masquage des groupes "matières grasses" et "ratio acides gras saturés"
    document.getElementById("groupe_matieres_grasses").classList.add("hidden");
    document.getElementById("groupe_ratio_acides_gras_satures").classList.add("hidden");
    
    // Réaffichage les points des acides gras saturés
    document.getElementById("acides_gras_satures_points").classList.remove("hidden");
    
    // Vidage des champs
    document.getElementById("matieres_grasses").value="";
    document.getElementById("ratio_acides_gras_satures").value="";
    
    // Recalcul des acides gras saturés
    calcul_acides_gras_satures();
}

/* * * CALCULS DES POINTS PAR CHAMPS * * */

/* Calcul des points négatifs liés à la valeur énergétique */
function calcul_energie(){
    var energie=document.getElementById("energie").value;
    var pts=0;
    
    if (energie < 0){
        document.getElementById("energie").value=0;
        // Avertissement energie
    }
    
    if (mode == "boissons"){
        if (energie <= 0) {pts=0}
        else if (energie <= 30) {pts=1}
        else if (energie <= 60) {pts=2}
        else if (energie <= 90) {pts=3}
        else if (energie <= 120) {pts=4}
        else if (energie <= 150) {pts=5}
        else if (energie <= 180) {pts=6}
        else if (energie <= 210) {pts=7}
        else if (energie <= 240) {pts=8}
        else if (energie <= 270) {pts=9}
        else if (energie > 270) {pts=10}
    }
    else{   
        if (energie <= 335) {pts=0}
        else if (energie <= 670) {pts=1}
        else if (energie <= 1005) {pts=2}
        else if (energie <= 1340) {pts=3}
        else if (energie <= 1675) {pts=4}
        else if (energie <= 2010) {pts=5}
        else if (energie <= 2345) {pts=6}
        else if (energie <= 2680) {pts=7}
        else if (energie <= 3015) {pts=8}
        else if (energie <= 3350) {pts=9}
        else if (energie > 3350) {pts=10}
    }    
    document.getElementById("energie_points").value=pts;
    calcul_points_negatifs();
}

/* Calcul des points négatifs liés à la quantité d'acides gras saturés */
function calcul_acides_gras_satures(){
    var matieres_grasses = document.getElementById("matieres_grasses").value;
    var acides_gras_satures = document.getElementById("acides_gras_satures").value;
        
    var pts=0;
    
    // Vérif que les valeurs sont <= 100
    if (matieres_grasses > 100){
        matieres_grasses = 100;
        document.getElementById("matieres_grasses").value = matieres_grasses;
    }
    if (acides_gras_satures > 100){
        acides_gras_satures = 100;
        document.getElementById("acides_gras_satures").value = acides_gras_satures;
    }
    
    if (mode == "matieres_grasses"){
        // Pour les matières grasses, c'est le ratio acides gras saturés / mat grasses qui compte
        var ratio = 0;
        if (parseInt(matieres_grasses) != 0 && matieres_grasses != ""){
            ratio = Math.round(acides_gras_satures/matieres_grasses*10000)/100; // arrondi à 2 décimales
        }
        document.getElementById("ratio_acides_gras_satures").value=ratio;
        
        if (ratio < 10){pts=0;}
        else if (ratio < 16){pts=1;}
        else if (ratio < 22){pts=2;}
        else if (ratio < 28){pts=3;}
        else if (ratio < 34){pts=4;}
        else if (ratio < 40){pts=5;}
        else if (ratio < 46){pts=6;}
        else if (ratio < 52){pts=7;}
        else if (ratio < 58){pts=8;}
        else if (ratio < 64){pts=9;}
        else if (ratio >= 64){pts=10;}
        
        document.getElementById("ratio_acides_gras_satures_points").value=pts;
    }
    else{ // tous les autres cas
        if (acides_gras_satures <= 1) {pts=0}
        else if (acides_gras_satures <= 2) {pts=1}
        else if (acides_gras_satures <= 3) {pts=2}
        else if (acides_gras_satures <= 4) {pts=3}
        else if (acides_gras_satures <= 5) {pts=4}
        else if (acides_gras_satures <= 6) {pts=5}
        else if (acides_gras_satures <= 7) {pts=6}
        else if (acides_gras_satures <= 8) {pts=7}
        else if (acides_gras_satures <= 9) {pts=8}
        else if (acides_gras_satures <= 10) {pts=9}
        else if (acides_gras_satures > 10) {pts=10}
        
        document.getElementById("acides_gras_satures_points").value=pts;
    }
    
    calcul_points_negatifs();
}

 /* Calcul des points négatifs liés à la quantité de sucres */
function calcul_sucres(){
    var sucres=document.getElementById("sucres").value;
    var pts=0;
    
    // Vérif que le sucre est <= 100
    if (sucres > 100){
        sucres = 100;
        document.getElementById("sucres").value = sucres;        
    }
    
    if (mode == "boissons"){
        if (sucres <= 0) {pts=0}
        else if (sucres <= 1.5) {pts=1}
        else if (sucres <= 3) {pts=2}
        else if (sucres <= 4.5) {pts=3}
        else if (sucres <= 6) {pts=4}
        else if (sucres <= 7.5) {pts=5}
        else if (sucres <= 9) {pts=6}
        else if (sucres <= 10.5) {pts=7}
        else if (sucres <= 12) {pts=8}
        else if (sucres <= 13.5) {pts=9}
        else if (sucres > 13.5) {pts=10}
        
    }
    else {
        if (sucres <= 4.5) {pts=0}
        else if (sucres <= 9) {pts=1}
        else if (sucres <= 13.5) {pts=2}
        else if (sucres <= 18) {pts=3}
        else if (sucres <= 22.5) {pts=4}
        else if (sucres <= 27) {pts=5}
        else if (sucres <= 31) {pts=6}
        else if (sucres <= 36) {pts=7}
        else if (sucres <= 40) {pts=8}
        else if (sucres <= 45) {pts=9}
        else if (sucres > 45) {pts=10}
    }
    
    document.getElementById("sucres_points").value=pts;
    calcul_points_negatifs();
}

 /* Calcul des points positifs liés à la quantité de fibres */
function calcul_fibres(){
    var fibres=document.getElementById("fibres").value;
    var pts=0;
    
    // Vérif que les fibres sont <= 100
    if (fibres > 100){
        fibres = 100;
        document.getElementById("fibres").value = fibres;        
    }
    
    if (fibres <= 0.9) {pts=0;}
    else if (fibres <= 1.9) {pts=1;}
    else if (fibres <= 2.8) {pts=2;}
    else if (fibres <= 3.7) {pts=3;}
    else if (fibres <= 4.7) {pts=4;}
    else if (fibres > 4.7) {pts=5;}
    
    document.getElementById("fibres_points").value=pts;
    calcul_points_positifs();
}

/* Calcul des points positifs liés à la quantité de protéines */
function calcul_proteines(){
    var proteines=document.getElementById("proteines").value;
    var pts=0;
    
    // Vérif que les protéines sont <= 100
    if (proteines > 100){
        proteines = 100;
        document.getElementById("proteines").value = proteines;        
    }
    else if (proteines < 0){
        proteines = 0;
        document.getElementById("proteines").value = proteines;        
    }
    
    if (proteines <= 1.6) {pts=0;}
    else if (proteines <= 3.2) {pts=1;}
    else if (proteines <= 4.8) {pts=2;}
    else if (proteines <= 6.4) {pts=3;}
    else if (proteines <= 8) {pts=4;}
    else if (proteines > 8) {pts=5;}
    
    document.getElementById("proteines_points").value=pts;
    calcul_points_positifs();
}

/* Valeur entrée dans le champ "sel" -> calcul du sodium */
function calc_sel(){
    var sel = document.getElementById("sel").value;
    
    // Vérif que le sel soit <= 100
    if (sel > 100){
        sel = 100;
        document.getElementById("sel").value=sel;
    }
    
    document.getElementById("sodium").value=sel*400;
    calcul_sodium()
    
}

/* Valeur entrée dans le champ "sodium" -> calcul du sel */
function calc_sodium(){
    var sodium = document.getElementById("sodium").value;
    
    // Vérif que le sel soit <= 100
    var sel = sodium/400;
    if (sel > 100){
        sodium = 40000;
        document.getElementById("sodium").value=sodium;
    }
    
    document.getElementById("sel").value=document.getElementById("sodium").value/400;
    calcul_sodium()
}

/* Calcul des points négatifs liés à la quantité de sodium */
function calcul_sodium(){
    var sodium=document.getElementById("sodium").value;
    var pts=0;
    
    if (sodium <= 90) {pts=0;}
    else if (sodium <= 180) {pts=1;}
    else if (sodium <= 270) {pts=2;}
    else if (sodium <= 360) {pts=3;}
    else if (sodium <= 450) {pts=4;}
    else if (sodium <= 540) {pts=5;}
    else if (sodium <= 630) {pts=6;}
    else if (sodium <= 720) {pts=7;}
    else if (sodium <= 810) {pts=8;}
    else if (sodium <= 900) {pts=9;}
    else if (sodium > 900) {pts=10;}
    
    document.getElementById("sodium_points").value=pts;
    calcul_points_negatifs();
}

/* Calcul des points positifs liés à la proportion de fruits, légumes et noix */
function calcul_fruits(){
    var fruits=document.getElementById("fruits").value;
    var pts=0;
    
    // Vérif que les fruits sont <= 100 %
    if (fruits > 100){
        fruits = 100;
        document.getElementById("fruits").value = fruits;
    }
    
    if (mode == "boissons"){
        if (fruits <= 40) {pts=0;}
        else if (fruits <= 60) {pts=2;}
        else if (fruits <= 80) {pts=4;}
        else if (fruits > 80) {pts=10;}
    }
    else { // autres cas
        if (fruits <= 40) {pts=0;}
        else if (fruits <= 60) {pts=1;}
        else if (fruits <= 80) {pts=2;}
        else if (fruits > 80) {pts=5;}
    }    
    document.getElementById("fruits_points").value=pts;
    calcul_points_positifs();
}


/* * * CALCULS DES POINTS NEGATIFS POSITIFS ET DES SCORES * * */

/* Calcul du total des points négatifs après la mise à jour d'un champ correspondant */
function calcul_points_negatifs(){
    var energie_pts = parseInt(document.getElementById("energie_points").value);
    var acides_gras_satures_pts=0;
    if (mode == "matieres_grasses"){
        acides_gras_satures_pts = parseInt(document.getElementById("ratio_acides_gras_satures_points").value);
    }
    else {
        acides_gras_satures_pts = parseInt(document.getElementById("acides_gras_satures_points").value);
    }
    var sucres_pts = parseInt(document.getElementById("sucres_points").value);
    var sodium_pts = parseInt(document.getElementById("sodium_points").value);
    var pts;
    
    if (mode != "eau"){
        pts = energie_pts + acides_gras_satures_pts + sucres_pts + sodium_pts;
    }
    else { // eau
        pts = "-";
    }
        
    document.getElementById("points_negatifs").value = pts;
    calcul_score_nutritionnel();
}

/* Calcul du total des points positifs après la mise à jour d'un champ correspondant */
function calcul_points_positifs(){
    var fibres = parseInt(document.getElementById("fibres_points").value);
    var proteines = parseInt(document.getElementById("proteines_points").value);
    var fruits = parseInt(document.getElementById("fruits_points").value);
    var pts;
    
    if (mode != "eau"){
        pts = fibres + proteines + fruits;
    }
    else { // eau
        pts = "-";
    }
    document.getElementById("points_positifs").value = pts;
    
        
    calcul_score_nutritionnel();
}

/* Calcul du score nutritionnel à partir de la catégorie et des points positifs et négatifs */
function calcul_score_nutritionnel(){        
    var positifs = parseInt(document.getElementById("points_positifs").value);
    var negatifs = parseInt(document.getElementById("points_negatifs").value);
    var score = 0;
    
    var fibres = parseInt(document.getElementById("fibres_points").value);
    var proteines = parseInt(document.getElementById("proteines_points").value);
    var fruits = parseInt(document.getElementById("fruits_points").value);

    if (mode != "eau"){
        if (negatifs >= 11 && mode != "fromages" && fruits < 5){
            // les points positifs des protéines ne sont pas pris en compte
            score = negatifs - fibres - fruits;
        }
        else {  // négatifs < 11 ou mode == "fromages" ou fruits = 5
            // tous les points positifs sont pris en compte
            score = negatifs - positifs;
        }
    }
    else { // eau
        score = "-";
    }
    
    document.getElementById("score_nutritionnel").value = score;
    calcul_nutriscore()
    aiguille(score)
}

/* Calcul du Nutriscore à partir du score nutritionnel et de la catégorie */
function calcul_nutriscore(){
    var score = parseInt(document.getElementById("score_nutritionnel").value);
    var nutriscore = "-"
    
    if (mode == "boissons"){
        if (score <= 1){nutriscore="B";}
        else if (score <= 5){nutriscore="C";}
        else if (score <= 9){nutriscore="D";}
        else {nutriscore="E";}
    }
    else if (mode == "eau"){
        nutriscore = "A";
    }
    else { // général, matières grasses et fromages
        if (score <= -1){nutriscore="A";}
        else if (score <= 2){nutriscore="B";}
        else if (score <= 10){nutriscore="C";}
        else if (score <= 18){nutriscore="D";}
        else {nutriscore="E";}
    }    
    document.getElementById("nutri-score").value = nutriscore;
}

/* Calcul des scores dans le cas particulier où c'est de l'eau */
function calcul_eau(){
    document.getElementById("points_positifs").value = "-";
    document.getElementById("points_negatifs").value = "-";
    document.getElementById("score_nutritionnel").value = "-";
    document.getElementById("nutri-score").value = "A";

    aiguille(0);
    
}

/* Traçage des zones de couleurs sur le canvas */
function canvas_couleurs(){
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    
    // Effacement canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Coordonnées du centre des arcs
    var x = 200, y = 190, r = 170;
    
    if (mode == "boissons"){    // Echelle des couleurs adaptée pour les boissons
        // Arcs de couleur
        ctx.lineWidth = 35;
        // B
        ctx.beginPath();
        ctx.arc(x,y,r,Math.PI,Math.PI*1.358,false);
        ctx.strokeStyle = "#7c2";
        ctx.stroke();
        // C
        ctx.beginPath();
        ctx.arc(x,y,r,Math.PI*1.358,Math.PI*1.425,false);
        ctx.strokeStyle = "#fd0";
        ctx.stroke();
        // D
        ctx.beginPath();
        ctx.arc(x,y,r,Math.PI*1.425,Math.PI*1.492,false);
        ctx.strokeStyle = "#f80";
        ctx.stroke();
        // E
        ctx.beginPath();
        ctx.arc(x,y,r,Math.PI*1.492,Math.PI*2,false);
        ctx.strokeStyle = "#f30";
        ctx.stroke();

        // Lettres
        ctx.font = "bold 12pt Arial";
        ctx.fillStyle = "white";
        
        var text="B";
        ctx.fillText(text,55,100);

        var text="C";
        ctx.fillText(text,137,38);
        
        var text="D";
        ctx.fillText(text,172,28);
        
        var text="E";
        ctx.fillText(text,302,65);
    }
    else {  // Echelle des couleurs pour tous les autres produits
        // Arcs de couleur
        // A
        ctx.beginPath();
        ctx.lineWidth = 35;
        ctx.arc(x,y,r,Math.PI,Math.PI*1.264,false);
        ctx.strokeStyle = "#090";
        ctx.stroke();
        // B
        ctx.beginPath();
        ctx.arc(x,y,r,Math.PI*1.264,Math.PI*1.318,false);
        ctx.strokeStyle = "#7c2";
        ctx.stroke();
        // C
        ctx.beginPath();
        ctx.arc(x,y,r,Math.PI*1.318,Math.PI*1.464,false);
        ctx.strokeStyle = "#fd0";
        ctx.stroke();
        // D
        ctx.beginPath();
        ctx.arc(x,y,r,Math.PI*1.464,Math.PI*1.609,false);
        ctx.strokeStyle = "#f80";
        ctx.stroke();
        // E
        ctx.beginPath();
        ctx.arc(x,y,r,Math.PI*1.609,Math.PI*2,false);
        ctx.strokeStyle = "#f30";
        ctx.stroke();
        
        // Lettres
        ctx.font = "bold 12pt Arial";
        ctx.fillStyle = "white";
        
        var text="A";
        ctx.fillText(text,40,120);
        
        var text="B";
        ctx.fillText(text,90,60);

        var text="C";
        ctx.fillText(text,135,35);
        
        var text="D";
        ctx.fillText(text,215,25);
        
        var text="E";
        ctx.fillText(text,330,90);
    }
    
}

/* Affichage de l'aiguille dans la position indiquant le Nutriscore */
function aiguille(score){
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    
    // Reset du canvas pour retracer le centre qui efface l'aiguille
    ctx.setTransform(1, 0, 0, 1, 0, 0);

    // Aiguille
    ctx.fillStyle="black";
    ctx.translate(200, 188);    // Placement du centre de rotation à la base de l'aiguille
    
    // Calcul de l'angle : valeur entre 0 et 1
    if (mode =="boissons"){
        var angle = (score+20)/60;
    }
    else if (mode == "eau"){
        var angle = 0;
    }
    else {
        var angle = (score+15)/55;
    }
    
    angle2 = angle*Math.PI-(Math.PI/2);
    
    // Rotation de l'aiguille
    document.getElementById("aiguille").style.transform="rotate("+angle2+"rad) scale(.6)";
    
}

/* Initialisation */
window.onload = function(){
    canvas_couleurs();
    
    setTimeout(function(){
        aiguille(0);
    }, 500);
    aiguille(40);
}

/* Réinitialisation du tableau */
function reset(){
    document.getElementById("energie").value="";
    document.getElementById("energie_points").value="0";
    document.getElementById("matieres_grasses").value="";
    document.getElementById("acides_gras_satures").value="";
    document.getElementById("acides_gras_satures_points").value="0";
    document.getElementById("ratio_acides_gras_satures").value="";
    document.getElementById("ratio_acides_gras_satures_points").value="0";
    document.getElementById("sucres").value="";
    document.getElementById("sucres_points").value="0";
    document.getElementById("fibres").value="";
    document.getElementById("fibres_points").value="0";
    document.getElementById("proteines").value="";
    document.getElementById("proteines_points").value="0";
    document.getElementById("sel").value="";
    document.getElementById("sodium").value="";
    document.getElementById("sodium_points").value="0";
    document.getElementById("fruits").value="";
    document.getElementById("fruits_points").value="0";
    calcul_points_negatifs();
    calcul_points_positifs();
}


/* * * FAQ * * */

/* Déplier ou replier la réponse sous la question */
function deplier(e){
    var q = e.target;
    var r = q.nextElementSibling;
    
    if (r.classList.contains("reponse-cachee")){
        r.classList.remove("reponse-cachee");
        r.classList.add("reponse-visible");
    }
    else {
        r.classList.add("reponse-cachee");
        r.classList.remove("reponse-visible");
    }
}

/* Chargement de la page FAQ */
function load_faq(){
    var hash=window.location.hash;
    
    /* Si lien vers une ancre, on déplie la réponse correspondante */
    if (hash){
        hash=hash.substring(1,hash.length);
        r = document.getElementById(hash).nextElementSibling;
        r.classList.remove("reponse-cachee");
        r.classList.add("reponse-visible");
    }
    
}