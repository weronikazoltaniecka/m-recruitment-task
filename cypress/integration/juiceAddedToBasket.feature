Feature: Items added to the basket

  As a customer
  In order to purchase items
  I want to add items successfully to the basket

  Scenario Outline: Juice added to the basket

    Given I have "<amount>" bottles of "<size>" l "<flavor>" juice added to the basket
    When I proceed to my bag
    Then I should see proper products in the bag
    And total price should be correctly calculated in the bag

    Examples:
      | amount  | size | flavor   |
      | 1       | 0.5  | banana   |
      | 10      | 1    | orange   |
