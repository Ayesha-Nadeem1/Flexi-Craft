const { create } = require("domain");
import 'cypress-promise/register'


function createRoom(){
    cy.visit('/')
    cy.contains('new room').click()
    cy.get("input[placeholder='ROOM ID']").invoke("val").should("not.be.empty")
    cy.get("input[placeholder='USERNAME']").type("Yahya")
    cy.contains("Join").click();
    cy.contains("Connected Clients")
    cy.contains("Yahya")
}

function DragnDrop(elements){
  elements.forEach((element)=>{
    it("should drag and drop the element", ()=>{
      cy.get(element).closest('div[draggable="true"]').drag("div[draggable='false']")
      cy.get("div[draggable='false']").children().should("not.be.empty")
    })
  })
}

const basic_elements = [
  "svg.lucide-type",
  "svg.lucide-square-pen",
  "svg.lucide-mouse-pointer-click",
  "svg.lucide-youtube",
  "svg.lucide-contact-round",
  "svg.lucide-check-check",
]

const landingpage_elements = [
  "svg.lucide-kanban",
  "svg.lucide-award",
  "svg.lucide-star",
  "svg.lucide-pen-tool",
  "svg.lucide-menu",
  "svg.lucide-chef-hat",
  "svg.lucide-square-split-horizontal",
  "svg.lucide-text-select",
  "svg.lucide-loader-circle",
  "svg.lucide-ellipsis",
  "svg.lucide-quote",
];

const advanced_elements= [
  "svg.lucide-git-graph",
  "svg.lucide-navigation2",
  "svg.lucide-wallet-cards",
  "svg.lucide-scan-face",
  "svg.lucide-search",
  "svg.lucide-table",
  "svg.lucide-step-forward",
  "svg.lucide-person-standing",
  "svg.lucide-log-in",
  "svg.lucide-kanban",
]

describe("Room Creation Testing", () => {

    it.skip("Room page loading test", () => { 
      cy.visit("/"); 
      cy.contains("Editor").should("be.visible");
      cy.get("input[placeholder='ROOM ID']").should("be.visible")
      cy.get("input[placeholder='USERNAME']").should("be.visible")
      cy.contains('Join').should("be.visible")
      cy.contains('new room').should("be.visible")
    });

    it.skip("should create room", ()=>{ 
        createRoom();

    });

    it.skip("should validate the room creation input fields", ()=>{ 
        cy.visit('/')
        cy.contains("Join").click();
        cy.contains("ROOM ID & username are required")
    })

    it.skip("should load the editor", ()=>{ 
        createRoom()
        cy.contains("CSS Styling").should("be.visible")
    })

});

describe("Editor Drag & Drop Testing", () => {
    beforeEach(() => {;
        createRoom();
        cy.contains("CSS Styling").should("be.visible");
        cy.get("#radix-\\:ra\\:-trigger-Components").click();
        cy.contains("button", "Landing Page Elements").click();
        cy.contains("button", "Advanced Elements").click();
    });

    //DragnDrop(basic_elements)
    //DragnDrop(landingpage_elements)  //commented because of long testing times
    //DragnDrop(advanced_elements)

    it.skip("should test the editing of text element", ()=>{
      cy.get(basic_elements[0]).closest('div[draggable="true"]').drag("div[draggable='false']")
      cy.contains("Text").type('{selectall}{backspace}test')
      cy.contains('test')
    })

    it.skip("should test the editing of button element", ()=>{
      cy.get(basic_elements[2]).closest('div[draggable="true"]').drag("div[draggable='false']")
      cy.contains("section", "Button").type("{selectall}{backspace}testbutton")
      cy.contains('testbutton')
    })

    it.skip("should test the editing of media element", ()=>{
      cy.get(basic_elements[3]).closest('div[draggable="true"]').drag("div[draggable='false']")
      const media = "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExMzh4MjRneGx1NHpveDZpejF6M2t3c2duZ2NwcG51OTZxMGNhb2dhNCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/VIKa3CjZDCoymNcBY5/giphy.gif"
      cy.get('input[placeholder="Enter media URL"]').type(media)
      cy.wait(300);
      cy.get("img").should("be.visible")
    })

    it.skip("should test the editing of header element", ()=>{
      cy.get(landingpage_elements[0]).closest('div[draggable="true"]').drag("div[draggable='false']")
      cy.get('header').should('be.visible')
      cy.contains('span', "Website Title").type("{selectall}{backspace}Test title")
      cy.contains('span', "A brief tagline or description goes here.").type("{selectall}{backspace}Test desc")
      cy.contains("Test title")
      cy.contains("Test desc")
    })

})


    