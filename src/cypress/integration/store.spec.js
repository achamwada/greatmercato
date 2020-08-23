describe('Test user Authentication', () => {
  it('should be able to sign up and login', () => {
    cy.visit('/signup');
    cy.get('[data-cy-firstname]').type('Alexander');
    cy.get('[data-cy-lastname]').type('Chamwada');
    cy.get('[data-cy-emailaddress]').type('alexanderchamwada@gmail.com');
    cy.get('[data-cy-password]').type('test1234');
    cy.get('[data-cy-signup]').click();
  });
});

describe('Test the user shopping experience', () => {
  beforeEach(function() {
    cy.visit('/signup');
    cy.get('[data-cy-firstname]').type('Alexander');
    cy.get('[data-cy-lastname]').type('Chamwada');
    cy.get('[data-cy-emailaddress]').type('alexanderchamwada@gmail.com');
    cy.get('[data-cy-password]').type('test1234');
    cy.get('[data-cy-signup]').click();
  });
  it('should be able to add a product to cart', () => {
    cy.get('[data-cy-addtocart="5d4f43b1a7e23d3a75c977a5"]').click();
    cy.get('[data-cy-addtocart="5d4f43b1a7e23d3a75c977a8"]').click();
    cy.get('[data-cy-cartlength]').contains(2);
  });

  it('should be able to remove a product to cart', () => {
    cy.get('[data-cy-addtocart="5d4f43b1a7e23d3a75c977a5"]').click();
    cy.get('[data-cy-addtocart="5d4f43b1a7e23d3a75c977a8"]').click();
    cy.get('[data-cy-cartlength]').contains(2);
    cy.get('[data-cy-removefromcart="5d4f43b1a7e23d3a75c977a8"]').click();
    cy.get('[data-cy-cartlength]').contains(1);
  });

  it('should be able to clear cart', () => {
    cy.get('[data-cy-addtocart="5d4f43b1a7e23d3a75c977a5"]').click();
    cy.get('[data-cy-addtocart="5d4f43b1a7e23d3a75c977a8"]').click();
    cy.get('[data-cy-gotocart]').click();
    cy.get('[data-cy-clear-cart').click();
    cy.get('[data-cy-cart-status]').contains('Your shopping cart is now empty');
  });

  it.only('should be able to edit product quantity and price increases', () => {
    let initialTotal = cy.get('[data-cy-cart-total]');
    console.log('initialTotal', initialTotal);
    cy.get('[data-cy-addtocart="5d4f43b1a7e23d3a75c977a5"]').click();
    cy.get('[data-cy-addtocart="5d4f43b1a7e23d3a75c977a8"]').click();
    cy.get('[data-cy-gotocart]').click();
    cy.get('[data-cy-multiple-product="5d4f43b1a7e23d3a75c977a8"]').select('3');
    let finalTotal = parseInt(cy.get('[data-cy-cart-total]'));
    expect(initialTotal).to.be.lessThan(finalTotal);
  });

  it('should be able to go to cart page and still have the same cart items', () => {
    cy.get('[data-cy-addtocart="5d4f43b1a7e23d3a75c977a5"]').click();
    cy.get('[data-cy-addtocart="5d4f43b1a7e23d3a75c977a8"]').click();
    cy.get('[data-cy-cartlength]').contains(2);
    cy.get('[data-cy-gotocart]').click();
    cy.get('[data-cy-cartlength]').contains(2);
  });

  it('should be able remove products from cart page', () => {
    cy.get('[data-cy-addtocart="5d4f43b1a7e23d3a75c977a5"]').click();
    cy.get('[data-cy-addtocart="5d4f43b1a7e23d3a75c977a8"]').click();
    cy.get('[data-cy-cartlength]').contains(2);
    cy.get('[data-cy-gotocart]').click();
    cy.get('[data-cy-removeitemincart="5d4f43b1a7e23d3a75c977a5"]').click();
    cy.get('[data-cy-cartlength]').contains(1);
  });

  it('should be able to buy a product', () => {
    cy.get('[data-cy-addtocart="5d4f43b1a7e23d3a75c977a5"]').click();
    cy.get('[data-cy-addtocart="5d4f43b1a7e23d3a75c977a8"]').click();
    cy.get('[data-cy-cartlength]').contains(2);
    cy.get('[data-cy-gotocart]').click();
    cy.get('[data-cy-gotocheckout]').click();
    cy.get('[data-cy-address]').type('Bromley 5 Road, London');
    cy.get('[data-cy-postcode]').type('TN37 9YT');
    cy.get('[data-cy-save-personal-details]').click();
    cy.get('[data-cy-open-cc]').click();
    cy.get('[data-cy-accountnum]').type('4921883992739273');
    cy.get('[data-cy-expiry]').type('07 / 2020');
    cy.get('[data-cy-cvv]').type('247');
    cy.get('[data-cy-make-payment]').click();
    cy.get('[data-order-confirmed]').contains('Order Successful');
  });
});
