const { create } = require("domain");
import 'cypress-promise/register'


function createRoom(){
    cy.visit('/')
    cy.contains('new room').click()
    cy.get("input[placeholder='ROOM ID']").invoke("val").should("not.be.empty")
    cy.get("input[placeholder='USERNAME']").type("Yahya")
    cy.contains("Join").click();
    cy.wait(2000)
    cy.contains("Connected Clients")
    cy.contains("Yahya")
}

function DragnDropnDel (elements){
  elements.forEach((element)=>{
    it("should drag and drop the element", ()=>{
      cy.get(element).closest('div[draggable="true"]').drag("div[draggable='false']")
      cy.get("div[draggable='false']").children().should("not.be.empty")
      cy.get("div[draggable='false']").children().click({multiple : true, force : true})
      cy.get("svg.lucide-trash").first().click({force : true});
      cy.get("div[draggable='false']").children().should("not.be.visible");
    })
  })
}

function DragDropStyle (elements){
  elements.forEach((element)=>{
    it("should drag, drop and style the element", ()=>{
      cy.get(element).closest('div[draggable="true"]').drag("div[draggable='false']")
      cy.get("div[draggable='false']").children().should("not.be.empty")
      cy.get("div[draggable='false']").children().click({multiple : true, force : true})
      cy.get("div[draggable='false']").children().should("not.be.empty")
      
      //styling pipeline
      cy.wait(500);
      cy.get("svg.lucide-settings").click({force : true})
      cy.wait(500);
      cy.get("svg.lucide-align-center").click()
      cy.wait(500);
      cy.get("svg.lucide-chevron-down").eq(1).click()
      cy.wait(500);
      cy.contains("Verdana").click()
      cy.wait(500);
      cy.get("input[id='color']").type("{selectall}{backspace}BLUE") 
      cy.wait(500);
      cy.get("svg.lucide-chevron-down").eq(2).click()
      cy.wait(500);
      cy.contains("Bold").click()
      cy.wait(500);
      cy.get("input[id='fontSize']").type("25px")
      cy.wait(500);
      cy.get("input[id='height']").type("600px")
      cy.wait(500);
      cy.get("input[id='width']").type("500px")
      cy.wait(500);
      cy.get("input[id='marginTop']").type("100px")
      cy.wait(500);
      cy.get("input[id='marginBottom']").type("100px")
      cy.wait(500);
      cy.get("input[id='marginLeft']").type("100px")
      cy.wait(500);
      cy.get("input[id='marginRight']").type("100px")
      cy.wait(500);
      cy.get("input[id='paddingTop']").type("100px")
      cy.wait(500);
      cy.get("input[id='paddingBottom']").type("100px")
      cy.wait(500);
      cy.get("input[id='paddingLeft']").type("100px")
      cy.wait(500);
      cy.get("input[id='paddingRight']").type("100px")
      cy.get('span[role="slider"]').first()
      .focus()
      .trigger('keydown', { key: 'ArrowLeft', shiftKey : true }) 
      .trigger('keydown', { key: 'ArrowLeft', shiftKey : true }) 
      .trigger('keydown', { key: 'ArrowLeft', shiftKey : true }) 
      .trigger('keydown', { key: 'ArrowLeft', shiftKey : true }) 
      cy.get('span[role="slider"]').eq(1)
      .focus()
      .trigger('keydown', { key: 'ArrowRight', shiftKey : true }) 
      .trigger('keydown', { key: 'ArrowRight', shiftKey : true }) 
      cy.wait(500);
      cy.get("input[id='backgroundColor']").type("#d11b1b")
      cy.wait(500);
      cy.get("input[id='backgroundImage']").type("url(https://images.unsplash.com/photo-1735322122784-859d1445023d?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)")
      cy.wait(500);
      cy.get("svg.lucide-align-vertical-justify-center").first().click()
      cy.wait(500);
      cy.get("svg.lucide-align-horizontal-justify-center").click()
      cy.wait(500);
      cy.get("svg.lucide-align-vertical-justify-start").click()
      cy.wait(500);
      cy.get("input[id='flexDirection']").type("60px")
      cy.wait(500);

      
      
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
  "svg.lucide-move3d",
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

describe("Editor Drag, Drop, Removal & Component Editing Testing", () => {
    beforeEach(() => {
        createRoom();
        cy.contains("CSS Styling").should("exist").and("be.visible");
        cy.get("#radix-\\:ra\\:-trigger-Components").click();
        cy.contains("button", "Landing Page Elements").click();
        cy.contains("button", "Advanced Elements").click();
    });

    //DragnDropnDel(basic_elements) 
    //DragnDropnDel(landingpage_elements)   
    //DragnDropnDel(advanced_elements)


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

    it.skip("should test the editing of hero section", ()=>{
      cy.get(landingpage_elements[1]).closest("div[draggable='true']").drag("div[draggable='false']")
      cy.contains("span", "Your Main Heading Here").type("{selectall}{backspace}test heading")
      cy.contains("span", "Your compelling subheading goes here.").type("{selectall}{backspace}test subheading")
      cy.contains("test heading")
      cy.contains("test subheading")
    })

    it.skip("should test the editing of values section", ()=>{
      cy.get(landingpage_elements[2]).closest("div[draggable='true']").drag("div[draggable='false']")

      const spantxts = [
      'Your Value Proposition Title',
      'A compelling description of the value you offer to your customers.',
      'Core Value 1',
      'Core Value 2',
      'Core Value 3',
      'Core Value 4',
      'Description of core value.',
      'Description of core value.',      
      'Description of core value.',
      'Description of core value.',
      ]

      spantxts.forEach((spantxt)=>{
        cy.contains("span", spantxt).type("{selectall}{backspace}TEST")
        cy.contains("TEST").should("be.visible");
      })

    })

    it.skip("should test the editing of features section", ()=>{
      cy.get(landingpage_elements[3]).closest("div[draggable='true']").drag("div[draggable='false']")

      const spantxts = [
      'Our Amazing Features',
      'Discover the innovative features we offer.',
      'Feature 1',
      'Feature 2',
      'Feature 3',
      'Feature 4',
      'Description of the feature.',
      'Description of the feature.',      
      'Description of the feature.',
      'Description of the feature.',
      ]

      spantxts.forEach((spantxt)=>{
        cy.contains("span", spantxt).type("{selectall}{backspace}FEATUREEDITTEST")
        cy.contains("FEATUREEDITTEST").should("be.visible");
      })

    })

    it.skip("should test the editing of footer section", ()=>{
      cy.get(landingpage_elements[4]).closest("div[draggable='true']").drag("div[draggable='false']")

      const spantxts = [
      'Footer text goes here.',
      'Your tagline or additional info.',
      ]

      spantxts.forEach((spantxt)=>{
        cy.contains("span", spantxt).type("{selectall}{backspace}FOOTERTEST")
        cy.contains("FOOTERTEST").should("be.visible");
      })
    })

    it.skip("should test the editing of the dynamic text set", ()=>{
      const options = ['Desert', 'Forest', 'Canyon', 'Glacier', 'Mountains', 'Ocean', 'Fries']
      cy.get(landingpage_elements[8]).closest("div[draggable='true']").drag("div[draggable='false']")

      options.forEach((option)=>{
        cy.get("select").select(option)
        cy.get("h1").first().type("{selectall}{backspace}TEST")
        cy.contains("TEST").should("be.visible")
      })

    })

    it.skip("should test the editing of the button set", ()=>{
      const buttons = ['Button 1', 'Button 2', 'Button 3']
      cy.get(landingpage_elements[10]).closest("div[draggable='true']").drag("div[draggable='false']")

      buttons.forEach((button)=>{
        cy.contains("div", button).type("{selectall}{backspace}BUTTON-TEST")
        cy.contains("BUTTON-TEST").should("be.visible")
      })

    })

    it.skip("should test the editing of the testimonial section", ()=>{
      cy.get(landingpage_elements[11]).closest("div[draggable='true']").drag("div[draggable='false']")
      const Texts = ['This is a fantastic service!', 'John Doe']

      Texts.forEach((txt)=>{
        cy.contains("span", txt).type("{selectall}{backspace}TEST")
        cy.contains("TEST").should("be.visible")
      })

    })


    it.skip("should test the editing of the carousel section", ()=>{
      cy.get(advanced_elements[3]).closest("div[draggable='true']").drag("div[draggable='false']")
      const Texts = ['Image URL 1', 'Image URL 2', 'Image URL 3']

      const imgurls = [
      'https://images.unsplash.com/photo-1740680209886-c461a9c692f3?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1740312566180-5f96174fad47?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://plus.unsplash.com/premium_photo-1732568817442-342a8c77fb80?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
      ]

      Texts.forEach((txt, index) => {
        cy.get(`input[placeholder="${txt}"]`).type(`{selectall}{backspace}${imgurls[index]}`);        
      });

      cy.get('input[value="Image Carousel"]').type("{selectall}{backspace}Carousel Test")

      imgurls.forEach((imgurl)=>{
        cy.get(`img[src="${imgurl}"]`).should("be.visible")
        cy.contains("button", "Next").click()
        cy.wait(800)
      }) //flaky cuz of inconsistent img loading times
    })

    it.skip("should test the editing of the tabs and accordions section", ()=>{
      cy.get(advanced_elements[5]).closest("div[draggable='true']").drag("div[draggable='false']")

      const values= [ 'Tabs', 'Tab 1', 'Tab 2','Tab 3', 'Accordions',
        'Accordion 1',
        'Accordion 2',
        'Accordion 3',

      ]
      values.forEach((value)=>{
        cy.get(`input[value="${value}"]`).type("{selectall}{backspace}TA test")
        cy.get("input[value='TA test']").should('be.visible');

        if (value === 'Tab 1' || value === 'Tab 2' || value === 'Tab 3' || 
          value === 'Accordion 1' || value === 'Accordion 2' || value === 'Accordion 3') 
        {
          cy.contains("textarea", "Content for").type("{selectall}{backspace}TA content test");
        }

      })  

    })


    it.skip("should test the editing of the steps section", ()=>{
      cy.get(advanced_elements[6]).closest("div[draggable='true']").drag("div[draggable='false']")

      const Steps= [ 'Steps', 'Step 1','Step 2','Step 3']
      Steps.forEach((step)=>{
        cy.get(`input[value="${step}"]`).type("{selectall}{backspace}Step test")
        cy.get("input[value='Step test']").should('be.visible');

      })  

      const Stepdescs= [
      'Description for Step 1',
      'Description for Step 2',
      'Description for Step 3',
      ]

      Stepdescs.forEach((val)=>{
        cy.contains("textarea", val).type("{selectall}{backspace}Step content test");
        cy.contains("Step content test").should("be.visible")
      })

    })
    
    it.skip("should test the editing of the grids and cards section", ()=>{
      cy.get(advanced_elements[2]).closest("div[draggable='true']").drag("div[draggable='false']")
      cy.contains("section", "Card").click();

      const Cards = ['Card 1', 'Card 2','Card 3']
      const Cardstxts = ['This is the first card.', 'This is the second card.','This is the third card.']

      Cards.forEach((txt) => {
        cy.get(`input[value="${txt}"]`).type("{selectall}{backspace}CARDTEST");
        cy.get("input[value='CARDTEST']").should("be.visible")
      });
      
      Cardstxts.forEach((txt)=>{
        cy.contains("textarea", txt).type("{selectall}{backspace}CARDDESCTEST")
        cy.contains("CARDDESCTEST").should("be.visible")
      })

      const imgurls = ["Enter image URL", 'Enter image URL', "Enter image URL"]
      imgurls.forEach((url, index)=>{
        cy.get(`input[placeholder="${url}"]`).eq(index).type("{selectall}{backspace}https://plus.unsplash.com/premium_photo-1671732135769-f4051b8a08f0?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", {force: true})
      })

      cy.get("img[src='https://plus.unsplash.com/premium_photo-1671732135769-f4051b8a08f0?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D']")
      .should("be.visible")
    })

})

describe("Editor Component Styling Tests", ()=>{
  beforeEach(() => {
    createRoom();
    cy.contains("CSS Styling").should("exist").and("be.visible");
    cy.get("#radix-\\:ra\\:-trigger-Components").click();
    cy.contains("button", "Landing Page Elements").click();
    cy.contains("button", "Advanced Elements").click();
});

  DragDropStyle(basic_elements)
  //DragDropStyle(landingpage_elements)
  //DragDropStyle(advanced_elements)

})




    