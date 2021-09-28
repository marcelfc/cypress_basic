
describe("Tickets", () => {
    beforeEach(() => cy.visit("https://bit.ly/2XSuwCW"));

    it("fills all text inputs fields", () => {
        const firstName = "Marcel"
        const lastName= "Cordeiro"
        cy.get("#first-name").type(firstName)
        cy.get("#last-name").type(lastName)
        cy.get("#email").type("marcel@teste.com")
        cy.get("#requests").type("Some text")
        cy.get("#signature").type(`${firstName} ${lastName}`)
    });

    it("select two tickets", () => {
        cy.get("#ticket-quantity").select("2")
    });

    it("select vip ticket type", () => {
        cy.get("#vip").check()
    });

    it("selects 'social media' checkbox", () => {
        cy.get("#social-media").check()
    });


    it("has 'TICKETBOX' header's heading", () => {
        cy.get("header h1").should("contain", "TICKETBOX")
    });

    it("alerts on invalid email", () => {
        cy.get("#email")
        .as("email")
        .type("invalidemail.com")

        cy.get("#email.invalid").should("exist")

        cy.get("@email").clear().type("marcel@gmail.com")

        cy.get("#email.invalid").should("not.exist")
    });

    it("fills and reset the form", () => {

        const firstName = "Marcel"
        const lastName= "Cordeiro"

        const fullName = `${firstName} ${lastName}`

        cy.get("#first-name").type(firstName)
        cy.get("#last-name").type(lastName)
        cy.get("#email").type("marcel@teste.com")
        cy.get("#ticket-quantity").select("2")
        cy.get("#vip").check()
        cy.get("#social-media").check()
        cy.get("#requests").type("Some request")

        cy.get(".agreement p")
            .should("contain", `I, ${fullName}, wish to buy 2 VIP tickets.`)

        cy.get("#agree").click()

        cy.get("#signature").type(fullName)

        cy.get("button[type='submit']").as('submitButton').should('not.be.disabled')

        cy.get("button[type='reset']").click()

        cy.get("@submitButton").should("be.disabled")


    });

    it("fills mandadory fields using support command", () => {
        
        const customer = {
            firstName: "João",
            lastName: "Silva",
            email: "joaosilva@wxample.com"
        }

        cy.fillMandatoryFields(customer)

        cy.get("button[type='submit']").as('submitButton').should('not.be.disabled')

        cy.get("#agree").uncheck()

        cy.get("@submitButton").should("be.disabled")

    });

})