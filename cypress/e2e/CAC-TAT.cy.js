describe('Central de Atendimento ao Cliente TAT', ()=>{
  beforeEach(()=>{
    cy.visit('./src/index.html')
    
  })
  it('verifica o título da aplicação', ()=>{
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
  })

  it('preenche os campos obrigatórios e envia o formulário', ()=>{
    const longText = Cypress._.repeat('teste texto longo teste texto longo', 10)

    cy.get('#firstName')
      .should('be.visible')
      .type('Luiz')
      .should('have.value', 'Luiz')
    cy.get('#lastName')
      .should('be.visible')
      .type('Monaro')
      .should('have.value', 'Monaro')
    cy.get('#email')
      .should('be.visible')
      .type('email@teste.com.br')
    cy.get('#open-text-area').type(longText, {delay:0})
    cy.contains('button', 'Enviar').click()
    cy.get('.success').should('be.visible')
  })

  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', ()=>{
    cy.get('#firstName')
      .should('be.visible')
      .type('Luiz', {delay:0})
      .should('have.value', 'Luiz')
    cy.get('#lastName')
      .should('be.visible')
      .type('Monaro', {delay:0})
      .should('have.value', 'Monaro')
    cy.get('#email')
      .should('be.visible')
      .type('emailtest')
    cy.get('#open-text-area').type('teste de descrição')
    cy.contains('button', 'Enviar').click()
    cy.get('.error').should('be.visible')
  })

  it('validação para telefone com valor não-numérico', ()=>{
    cy.get('#phone')
      .type('testefone')
      .should('have.value', '')
  })

  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', ()=>{
    cy.get('#firstName')
      .should('be.visible')
      .type('Luiz')
      .should('have.value', 'Luiz')
    cy.get('#lastName')
      .should('be.visible')
      .type('Monaro')
      .should('have.value', 'Monaro')
    cy.get('#email')
      .should('be.visible')
      .type('email@teste.com.br')
    cy.get('#phone-checkbox').check()
    cy.get('#open-text-area').type('teste de descrição')
    cy.contains('button', 'Enviar').click()
    cy.get('.error').should('be.visible')
  })

  it('preenche e limpa os campos nome, sobrenome, email e telefone', ()=>{
    cy.get('#firstName')
      .type('Luiz')
      .should('have.value', 'Luiz')
      .clear()
      .should('have.value', '')
    cy.get('#lastName')
      .type('Monaro')
      .should('have.value', 'Monaro')
      .clear()
      .should('have.value', '')
    cy.get('#email')
      .type('teste@email.com.br')
      .should('have.value', 'teste@email.com.br')
      .clear()
      .should('have.value', '')
    cy.get('#phone')
      .type('34544444')
      .should('have.value', '34544444')
      .clear()
      .should('have.value', '')
  })
  
  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', ()=>{
    cy.contains('button', 'Enviar').click()
    cy.get('.error').should('be.visible')
  })

  it('envia o formuário com sucesso usando um comando customizado', ()=>{
    cy.fillMandatoryFieldsAndSubmit()
    
    cy.get('.success').should('be.visible')
  })

  it('seleciona um produto (YouTube) por seu texto', ()=>{
    cy.get('#product')
      .select('YouTube')
      .should('have.value', 'youtube')
  })

  it('seleciona um produto (Mentoria) por seu valor (value)', ()=>{
    cy.get('#product')
      .select('mentoria')
      .should('have.value', 'mentoria')
  })

  it('seleciona um produto (Blog) por seu índice', ()=>{
    cy.get('#product')
      .select(1)
      .should('have.value', 'blog')
  })

  it('marca o tipo de atendimento "Feedback"', ()=>{
    cy.get('input[type="radio"][value=feedback]')
      .check()
      .should('have.value', 'feedback')
  })

  it('marca cada tipo de atendimento', () =>{
    cy.get('input[type="radio"]').each(($radio)=>{
      cy.wrap($radio)
        .check()
        .should('be.checked')
    })
  })

  it('marca ambos checkboxes, depois desmarca o último', ()=>{
    cy.get('input[type="checkbox"]')
      .check()
      .should('be.checked')
      .last()
      .uncheck()
      .should('not.be.checked')
  })
  it('seleciona um arquivo da pasta fixtures', ()=>{
    cy.get('input[type="file"]')
      .selectFile('cypress/fixtures/example.json')
      .should(input=>{
        expect(input[0].files[0].name).to.equal('example.json')
      })
  })

  it('seleciona um arquivo simulando um drag-and-drop', ()=>{
    cy.get('input[type="file"]')
      .selectFile('cypress/fixtures/example.json', { action : 'drag-drop'})
      .should(input=>{
        expect(input[0].files[0].name).to.equal('example.json')
      })
  })

  it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', ()=>{
    cy.fixture('example.json').as('sampleFile')
    cy.get('input[type="file"]')
      .selectFile('@sampleFile')
      .should(input=>{
        expect(input[0].files[0].name).to.equal('example.json')
      })
  })

  it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', ()=>{
    cy.contains('a', 'Política de Privacidade')
      .should('have.attr', 'href', 'privacy.html')
      .and('have.attr', 'target', '_blank')
  })

  it('acessa a página da política de privacidade removendo o target e então clicando no link', ()=>{
    cy.contains('a', 'Política de Privacidade')
      .invoke('removeAttr', 'target')
      .click()
    
    cy.contains('h1', 'CAC TAT - Política de Privacidade').should('be.visible')
  })

  
})