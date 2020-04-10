Feature: Items sorted by specified sort options

  As a customer
  In order to choose an item
  I want to sort them by selected option

  Scenario Outline: Sorting juices

    Given I am on Juices page
    When I select "<sorting>" sort option
    Then the items should be correctly sorted


    Examples:
      | sorting         |
      | Price Low-High  |
      | Price High-Low  |
      | Name Increasing |
      | Name Decreasing |
