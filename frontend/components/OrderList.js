import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { updateFilter } from '../state/filterSlice'
import { useGetPizzaHistoryQuery } from '../state/pizzaApi';

export default function OrderList() {
  const orders = useGetPizzaHistoryQuery().data || []
  const dispatch = useDispatch();
  const currentFilter = useSelector(st => st.filters.size)

    return (

    <div id="orderList">
      <h2>Pizza Orders</h2>
      <ol>
      {orders &&
          orders
            .filter(
              (ord) => currentFilter === "All" || currentFilter === ord.size
            )
            .map((ord) => {
              const { id, customer, size, toppings } = ord;
              return (
                <li key={id}>
                  <div>
                    {customer} ordered a size {size} with{" "}
                    {toppings?.length || "no"} topping
                    {toppings && toppings.length === 1 ? "" : "s"}
                  </div>
                </li>
              );
            })}
      </ol>
      <div id="sizeFilters">
        Filter by size:
        {['All', 'S', 'M', 'L'].map((size) => {
          const onClick = () => dispatch(updateFilter(size))
          const className = `button-filter${size === 'All' ? ' active' : ''}`;
          return (
            <button
            data-testid={`filterBtn${size}`}
            className={className}
            key={size}
            onClick = {onClick}
          >
            {size}
          </button>
        );
      })}
      </div>
    </div>
  )
}
