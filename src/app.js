

var UI = require('ui');

var upscore=0;
var downscore=0;
var last=0;
var win=0;


var card = new UI.Card({
  title:'Score'
});
var menu = new UI.Menu({
  sections: [{
    items: [{
      title: 'Annuler',
      subtitle: 'Annule le dernier point'
    }, {
      title: 'Reset',
      subtitle: 'Remet à 0'
    }]
  }]
});
menu.on('select', function(e) {
  if(e.itemIndex===0) {
    if(last==1 && upscore>0){
      upscore-=1;
    }
    if(last==2 && downscore>0){
      downscore-=1;
    }
  }
  if(e.itemIndex==1) {
    upscore=0;
    downscore=0;
  }
  last=0;
  win=0;
  menu.hide();
  displayscore();
});

function displayscore() {
  card.body(upscore+"\n\n"+downscore);
}

function checkwon() {
  if(upscore==21 && downscore<20) {
   card.body("Ils gagnent par\n "+upscore+"-"+downscore);
    win=1;
    return;
  }
  if(downscore==21 && upscore<20) {
   card.body("Vous gagnez par\n "+downscore+"-"+upscore);
    win=1;
    return;
  }
  
  if(upscore>21 && upscore>downscore+1) {
   card.body("Ils gagnent par\n "+upscore+"-"+downscore);
    win=1;
    return;
  }
  if(downscore>21 && downscore>upscore+1) {
   card.body("Vous gagnez par\n "+downscore+"-"+upscore);
    win=1;
    return;
  }
  
  if(upscore==30) {
   card.body("Ils gagnent par\n "+upscore+"-"+downscore);
    win=1;
    return;
  }
  if(downscore==30) {
   card.body("Vous gagnez par\n "+downscore+"-"+upscore);
    win=1;
    return;
  }
}

card.show();
displayscore();

card.on('click', 'up', function(e) {
  if(!win) {
    upscore+=1;
    last=1;
    displayscore();
    checkwon();
  }
});
card.on('click', 'down', function(e) {
  if(!win) {
    downscore+=1;
    last=2;
    displayscore();
    checkwon();
  }
});
card.on('click', 'select', function(e) {
  menu.show();
});