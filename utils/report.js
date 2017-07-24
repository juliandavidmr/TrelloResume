var pdfMake = require('pdfmake/build/pdfmake.js');
var pdfFonts = require('pdfmake/build/vfs_fonts.js');
pdfMake.vfs = pdfFonts.pdfMake.vfs;

import * as Trello from './trello'

var content = [];

/**
 * initialize content
 * @param {string} name 
 */
function initialize(name) {
  content = [{
    text: name,
    style: 'header',
    alignment: 'center'
  }]
}


/**
 * Add table resume
 * @param {string} name 
 * @param {[]} cards 
 * @param {[]} checklists 
 * @param {[]} users 
 */
function addResume(name, cards, checklists, users) {
  content.push(['Resumen total del tablero "' + name + '". ', {
    text: 'Generado por Trello Resume.',
    link: 'https://trelloresume.now.sh/'
  }]);
  content.push({
    style: 'tableExample',
    table: {
      body: [
        ['Actividades', 'Listas de chequeo', 'Miembros'],
        [cards.length, checklists.length, users.length]
      ]
    }
  })
}

/**
 * Add to content the list of cards
 * @param {*} cards 
 */
function addCards(cards) {
  var body = []

  content.push({
    text: '\nTarjetas',
    style: 'header'
  });

  var table = {
    style: 'tableExample',
    table: {
      widths: [15, '*', '*', 85, 54],
      body: []
    }
  };

  body.push(['#', 'Actividad', 'Descripción', 'Etiqueta', 'Miembros']);

  cards.map((it, index) => {
    body.push([{
        text: '' + (index + 1),
        link: it.url
      },
      it.name,
      (it.desc || it.desc == "") ? 'Sin descripción' : it.desc,
      Trello.getLabels(it),
      (it.idMembers.length == 0) ? 'Ninguno' : it.idMembers.length
    ])
  })

  table.table.body = body;

  content.push(table)
}

/**
 * add list
 * @param {[]} lists 
 */
function addList(lists) {
  var list = []
  list.push({
    text: '\nListas activas',
    style: 'header'
  });
  list.push({
    ul: []
  })
  lists.map(it => !it.closed ? list[1].ul.push(it.name) : null)

  content.push(list);
}

/**
 * add table members
 * @param {[]} members 
 */
function addMembers(members) {
  content.push({
    text: '\nPersonas activas en el tablero',
    style: 'header'
  });

  var table = {
    style: 'tableExample',
    table: {
      widths: [10, '*', 45, '*', 104],
      body: [
        ['#', 'Nombre', 'Iniciales', 'Biografia', 'Nombre de usuario'],
      ]
    }
  };

  members.map((it, index) => table.table.body.push([(index + 1) + '', {
      text: it.fullName + '',
      link: it.url
    },
    it.initials + '',
    (!it.bio || it.bio == "") ? 'Sin descripción' : it.bio + '',
    it.username + ''
  ]))

  content.push(table)
}

function addChecklists(checklists) {
  /*
  	'Each cell-element can set a rowSpan or colSpan',
  {
    style: 'tableExample',
    color: '#444',
    table: {
      widths: ['*', '*', '*'],
      headerRows: 2,
      // keepWithHeaderRows: 1,
      body: [
        [
            {text: 'Header 1', style: 'tableHeader', alignment: 'center'}, 
            {text: 'Header 2', style: 'tableHeader', alignment: 'center'}, 
            {text: 'Header 3', style: 'tableHeader', alignment: 'center'}],
        [{
            rowSpan: 3,
            text: 'rowSpan set to 3'
        }, 'Sample value 2', 'Sample value 3'],
        ['', 'Sample value 2', 'Sample value 3'],
        ['', 'Sample value XY', 'Sample value 3']
      ]
    }
   */
  content.push({
    text: '\nListas de chequeo',
    style: 'header'
  });

  var table = {
    style: 'tableExample',
    table: {
      widths: ['*', 300, '*'],
      headerRows: 2,
      body: [
        [{
            text: 'Listado',
            alignment: 'center'
          },
          {
            text: 'Acción',
            alignment: 'center'
          },
          {
            text: 'Estado',
            alignment: 'center'
          }
        ],
      ]
    }
  };

  checklists.map((it, index) => {
    var sublist = it.checkItems;

    setTimeout(function () {
      table.table.body.push([{
        rowSpan: sublist.length,
        text: it.name
      }, sublist[0].name, sublist[0].state == 'incomplete' ? 'Pendiente' : 'Completado', ])
      for (var i = 1; i < sublist.length; i++) {
        table.table.body.push(['', sublist[i].name, sublist[i].state == 'incomplete' ? 'Pendiente' : 'Completado'])
      }
    }, 1);
  })

  content.push(table)
}

export function generatePDF(dataTrello) {
  const name = Trello.name(dataTrello);
  initialize(name);

  const cards = Trello.cards(dataTrello);
  const checklists = Trello.checklists(dataTrello);
  const members = Trello.members(dataTrello);
  const list = Trello.list(dataTrello);

  addResume(name, cards, checklists, members)
  addCards(cards)
  addList(list)
  addMembers(members)
  addChecklists(checklists)

  var docDefinition = {
    content: content,
    styles: {
      header: {
        fontSize: 18,
        bold: true
      },
      subheader: {
        fontSize: 15,
        bold: true
      },
      quote: {
        italics: true
      },
      small: {
        fontSize: 8
      },
      tableExample: {
        margin: [0, 5, 0, 15]
      },
    }
  };

  // pdfMake.createPdf(docDefinition).open();
  setTimeout(function () {
    pdfMake.createPdf(docDefinition).download(`${name.replace(' ', '')}-${Date.now()}.pdf`);
  }, 10);
}