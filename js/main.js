//---------------MODEL------------------//
var model ={
  currentCat: null, // muito importante começar com null= significa que  nada foi escolhido
  cats:[
    {
    name : "Bob",
    clickCount : 0,
    imgSrc : "img/cat1.jpg",
    text : "I need some love !!!"
  },
  {
    name : "Tiger",
    clickCount : 0,
    imgSrc : "img/cat2.jpg",
    text : "I just want to be famous on Instagram, get rich by taking photos and doing nothing else!"
  },
  {
  name : "Zest",
  clickCount : 0,
  imgSrc : "img/cat3.jpg",
  text : "The only thing I'm thinking right now!"
  },
  {
  name : "Mr.Down",
  clickCount : 0,
  imgSrc : "img/cat4.jpg",
  text : "Please! Can I have my moment without being disturbed? "
  },
  {
  name : "Xoxo",
  clickCount : 0,
  imgSrc : "img/cat5.jpg",
  text : "Are you sure you want to talk?"
  },
  {
  name : "Zimba",
  clickCount : 0,
  imgSrc : "img/cat6.jpg",
  text : "OMG! I need to sleep! I can't work!"
  }
  ]
};

//---------------OCTOPUS-----------------//
 var octopus = {
   // inicia com a tela em branco, ou seja sem gatos e depois vai buscar o model e o view para init
   init: function() {
        // octopus diz ao model que current cat é o primeiro.
        // uma forma de mostrar o caminho[com um index inicial] de como chegar na info do model

        model.currentCat = model.cats[0];
        // no console.log =  0:{name: "Bob", clickCount: 0, imgSrc: "img/cat1.jpg"}

        // octopus diz ao view ( cat e cat list) que tem os dados do model e que podem iniciar
        catListView.init();
        catImageView.init();
   },

   // ele trará a lista de todos os gatos sem entrar no index específico
   getAllCatModel: function() {
    return model.cats;
   },

   // Ao clicar no botão - ele recebe pelo view a solicitação para atualizar o currentcat( pelo gato escolhido). Octopus atualiza o model e devolve para o viewList
   currentCat: function() {
     return model.currentCat;
   },

   // específico para o click button com o closure trick.
   // dessa forma ele busca aquilo que ficou retido.
   // ler view.init click
   setCurrentCat: function(cat) {
       model.currentCat = cat;
   },

   // cada vez que a imagem é clicada o counter deve ser atualizado no model ++ e instrui o o View to render
   counterIncrement: function() {
     model.currentCat.clickCount++;
     catImageView.render();
   },

   //recebe a info fo view, traduz para o model e
   newData: function() {
     var dName = nName;
     var dUrl = nUrl;
     var dClick = nClick;
     var dText = nText;

     model.currentCat.name = dName.value;
     model.currentCat.imgSrc = dUrl.value;
     model.currentCat.clickCount = dClick.value;
     model.currentCat.text = dText.value;
     // ele atualiza o current.cat e manda o view. render renderiza... o próprio render pede devolta
   },
	};

//---------------VIEW------------------//
 var catListView = {
   // como deve estar o meu view no início, o view recebe a info do octopus, passa pelo DOM( neste caso não há acréscimo de TAB ou DIV)
   // simplesmente link do var com o HTML --- atribuição
   //  no meu HTML eu tenho o div id= cat que contém (cat name, cat count, cat image) e renderiza
   //uma vez feita a atribuição ela deve ser instruida para render.


 /*na primeira etapa(init), ele atribui var - DOM que será trabalhado
 e manda renderizar. Ao renderizar ele precisa buscar a info do octopus
 de todos os gatos e assim criar new element <li> que será gerado através do loop
 */
   init : function(){
     // atribuição de var baseado no meu DOM que será trabalhado
     this.catListElem = document.getElementById('catList');

     this.render();
   },

   // update the DOM constantemente: o view recebe a info do octopus,o Dom é atualizado e renderiza
   render: function() {
     var getAllCats = octopus.getAllCatModel();  // atribui var a lista e info completa de todos o gatos através do octopus
     var cat;     //fala expecificamente daquilo que está dentro do allCatsModel - ou seja o index
     var elemList;  // preparação para a criação de um elemento <li>, neste caso

      //clean html histórico
     this.catListElem.innerHTML = '';

/*criação da lista= corremos pelo array através do for loop, determinamos que o index(cada gato) é igual a var cat
e criamos o element <li>
*/
    for(var i = 0; i < getAllCats.length; i++){
      cat = getAllCats[i];  // será gerado uma lista com todos os index >> gato1  gato2  gato3 etc
      elemList = document.createElement('li'); // uso o createElement pq começo do zero;
      //sigo o mesmo raciocío, anexado a info retirada cat = a lista index dos gatos e .name é para anexar somente o nome de cada gato no campo de cada li
      elemList.textContent = cat.name;

      //aqui eu  já crio o event click e já oriento como fucionará
      /* FORMULA --- function(catCopy){return (function(){.......};})(cat));  catCopy - Um forma de prevenir que ao clicar no
      botão ele reserve essa info e não permita que fique registado esse botão mesmo após clicando em outro botão
      */
      elemList.addEventListener('click', (function(catCopy){
        return function() {
          // o usuário click no botão - o octopus faz a monitorização
          // é ele que trará a info devolta (catCopy : o ultimo botaõ clicado que ficou no registo) par que o catImageViewpossa ser renderizado.
          octopus.setCurrentCat(catCopy);
          catImageView.render(); // tenho info mudada no model, então agora mostre a imagem
        };
      })(cat));
      // se eu não fizer ele não passa essa nova info para o HTML
      this.catListElem.appendChild(elemList);
      }
   }
 };

var catImageView = {
       // atribuição do var para Dom
       init : function(){
         this.cat =  document.getElementById('cat');
         this.catName =  document.getElementById('catName');
         this.catCount =  document.getElementById('catCount');
         this.catImage =  document.getElementById('catImage');
         this.catText =  document.getElementById('catText');
        // já colocar o click counterIncrement pronto
        // ele recebe o click e avisa ao octopus. Octopus atualiza no model e devolve
        this.catImage.addEventListener('click',function(){
          octopus.counterIncrement();
        });

        // coloco aqui o botão SUBMIT pq entra no mesmo
        // processo de início do catview, ou oseja, já deixo preparado o event e envio para o octopus
    		document.getElementById('form-submit').addEventListener('click', function(){
          var nName = document.getElementById('nName');
          var nUrl = document.getElementById('nUrl');
          var nClicks = document.getElementById('nClick');
          var nText = document.getElementById('nText');
          octopus.newData();
    			catImageView.render(); //e renderizada no catView ou melhor  através do octopus ?
    		});

        // autoriza o render do view
         this.render();
       },

       render : function(){
         var currentCat = octopus.currentCat();
         this.catName.textContent = currentCat.name;
         this.catCount.textContent = currentCat.clickCount;
         this.catImage.src = currentCat.imgSrc;
         this.catText.textContent = currentCat.text;
       }
};

// faltava init o octopus para  fazer tudo funcionar, afinal  tanto o view já foi init e render
octopus.init();
