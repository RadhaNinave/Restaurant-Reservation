describe('Restaurant Reservation', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('verifies location filter components are visible', () => {
    cy.get('div#state').should('be.visible');
    cy.get('div#city').should('be.visible');
  });

  it('displays restaurant search results after selecting location', () => {
    cy.intercept('GET', 'https://restaurantdata.onrender.com/restaurants?state=Texas&city=Austin', {
      fixture: 'restaurants.json'
    }).as('getRestaurants');
    cy.get('div#state').click();
    cy.contains('li', 'Texas', { timeout: 5000 }).click();
    cy.get('div#city').click();
    cy.contains('li', 'Austin', { timeout: 5000 }).click();
    cy.get('#searchBtn').should('contain.text', 'Search').click();
    cy.wait('@getRestaurants');
    cy.get('h1').should('contain.text', '2 restaurants available in Austin');
  });

  it('shows reservation button on restaurant cards', () => {
    cy.intercept('GET', 'https://restaurantdata.onrender.com/restaurants?state=Texas&city=Austin', {
      fixture: 'restaurants.json'
    }).as('getRestaurants');
    cy.get('div#state').click();
    cy.contains('li', 'Texas').click();
    cy.get('div#city').click();
    cy.contains('li', 'Austin').click();
    cy.get('#searchBtn').should('contain.text', 'Search').click();
    cy.wait('@getRestaurants');
    cy.get('button').contains('Book FREE Reservation').should('be.visible');
  });

  it('displays time slots and date options when booking a restaurant', () => {
    cy.intercept('GET', 'https://restaurantdata.onrender.com/restaurants?state=Texas&city=Austin', {
      fixture: 'restaurants.json'
    }).as('getRestaurants');
    cy.get('div#state').click();
    cy.contains('li', 'Texas').click();
    cy.get('div#city').click();
    cy.contains('li', 'Austin').click();
    cy.get('#searchBtn').should('contain.text', 'Search').click();
    cy.wait('@getRestaurants');
    cy.get('button').contains('Book FREE Reservation').click();
    cy.get('p').contains('Today').should('be.visible');
    cy.get('p').contains('Morning').should('be.visible');
    cy.get('p').contains('Afternoon').should('be.visible');
    cy.get('p').contains('Evening').should('be.visible');
  });

  it('should render the My Bookings page with header correctly', () => {
    cy.visit('/my-bookings');
    cy.get('h1').contains('My Bookings');
  });

  it('should maintain restaurant booking data in localStorage across page refreshes', () => {
    const mockBookings = [
      {
        restaurantName: 'Austin Food Expo',
        rating: 4,
        address: '555 Main St, Austin, Texas',
        city: 'Austin',
        state: 'Texas',
        bookingDate: '2025-03-27T18:30:00.000Z',
        bookingTime: '10:00 AM',
        bookingEmail: 'hello@gmail.com'
      }
    ];
    cy.window().then((win) => {
      win.localStorage.setItem('bookings', JSON.stringify(mockBookings));
    });
    cy.visit('/my-bookings');
    cy.get('h3').contains('Austin Food Expo', { timeout: 5000 }).should('be.visible');
    cy.reload();
    cy.get('h3').contains('Austin Food Expo', { timeout: 5000 }).should('be.visible');
  });
});
