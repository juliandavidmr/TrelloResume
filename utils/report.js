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
 * Get string all labels of a card
 * @param {[]} card 
 * @returns {string} 
 */
function getLabels(card) {
  if (card && card.labels) {
    return card.labels.map(l => l.name).join(', ')
  }
  return ''
}

/**
 * Add table resume
 * @param {string} name 
 * @param {[]} cards 
 * @param {[]} checklists 
 * @param {[]} users 
 */
function addResume(name, cards, checklists, users) {
  content.push('Resumen total del tablero "' + name + '"');
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
      getLabels(it),
      (it.idMembers.length == 0) ? 'Ninguno' : it.idMembers.length
    ])
  })

  table.table.body = body;

  content.push(table)
}

export function generatePDF(dataTrello) {
  const name = Trello.name(dataTrello);
  initialize(name);

  const cards = Trello.cards(dataTrello);
  const checklists = Trello.checklists(dataTrello);
  const users = Trello.members(dataTrello);

  addResume(name, cards, checklists, users)
  addCards(cards);

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
  pdfMake.createPdf(docDefinition).download(`${name.replace(' ', '')}-${Date.now()}.pdf`);
}