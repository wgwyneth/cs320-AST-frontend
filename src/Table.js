
import React from 'react'
import { useTable, useFilters, useGlobalFilter, useAsyncDebounce, useSortBy, usePagination } from 'react-table'  // new
import { useState } from "react";
import CreateGoalModal from './CreateGoalModal';
import EditGoalModal from './EditGoalModal';
import SelectGoalActionModal from './SelectGoalAction';
import Modal from 'react-bootstrap/Modal';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Comments from './Comments';

// Define a default UI for filtering
function GlobalFilter({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
}) {
  const count = preGlobalFilteredRows.length
  const [value, setValue] = React.useState(globalFilter)
  const onChange = useAsyncDebounce(value => {
    setGlobalFilter(value || undefined)
  }, 200)

  return (
    <span>
      Search:{' '}
      <input
        value={value || ""}
        onChange={e => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        placeholder={`${count} records...`}
      />
    </span>
  )
}

// This is a custom filter UI for selecting
// a unique option from a list
export function SelectColumnFilter({
  column: { filterValue, setFilter, preFilteredRows, id },
}) {
  // Calculate the options for filtering
  // using the preFilteredRows
  const options = React.useMemo(() => {
    const options = new Set()
    preFilteredRows.forEach(row => {
      options.add(row.values[id])
    })
    return [...options.values()]
  }, [id, preFilteredRows])

  // Render a multi-select box
  return (
    <select
      name={id}
      id={id}
      value={filterValue}
      onChange={e => {
        setFilter(e.target.value || undefined)
      }}
    >
      <option value="">All</option>
      {options.map((option, i) => (
        <option key={i} value={option}>
          {option}
        </option>
      ))}
    </select>
  )
}

function Table({ columns, data, addGoal }) {

  // onClick for Create Goal Button
  const [showCreateGoalModal, setShowCreateGoalModal] = useState(false);
  const [showEditGoalModal, setShowEditGoalModal] = useState(false);
  const [showGoalActionModal, setShowGoalActionModal] = useState(false);
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [EditGoal, setShowEditGoal] = useState(0);
  const [GoalID, setShowGoalID] = useState(0);

  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    
    page, // Instead of using 'rows', we'll use page,
    // which has only the rows for the active page

    // The rest of these things are super handy, too ;)
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,

    state,
    preGlobalFilteredRows,
    setGlobalFilter,
  } = useTable({
    columns,
    data,
  },
    useFilters, // useFilters!
    useGlobalFilter,
    useSortBy,
    usePagination,  // new
  )

  // Render the UI for your table
  return (
    <>
      <GlobalFilter
        preGlobalFilteredRows={preGlobalFilteredRows}
        globalFilter={state.globalFilter}
        setGlobalFilter={setGlobalFilter}
      />
      {headerGroups.map((headerGroup) =>
        headerGroup.headers.map((column) =>
          column.Filter ? (
            <div key={column.id}>
              <label for={column.id}>{column.render("Header")}: </label>
              {column.render("Filter")}
              <button onClick={() => setShowCreateGoalModal(true)}>Create Goal</button>
            </div>
          ) : null
        )
      )}

      <table {...getTableProps()} border="1">
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                // Add the sorting props to control sorting. For this example
                // we can add them into the header props
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render('Header')}
                  {/* Add a sort direction indicator */}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? ' 🔽'
                        : ' 🔼'
                      : ''}
                  </span>
                </th>
              ))}
              <th>Edit Goal</th>
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {  // new
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                })}
                <td className='EditButton' onClick={() => {setShowEditGoal(parseInt(row.cells[3].value)); setShowGoalID(parseInt(row.cells[0].value)); setShowGoalActionModal(true);}}> Edit </td>
              </tr>
            )
          })}
        </tbody>
      </table>
      {/* new */}
      <div className="pagination">
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {'<<'}
        </button>{' '}
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {'<'}
        </button>{' '}
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          {'>'}
        </button>{' '}
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {'>>'}
        </button>{' '}
        <span>
          Page{' '}
          <strong>
            {state.pageIndex + 1} of {pageOptions.length}
          </strong>{' '}
        </span>
        <select
          value={state.pageSize}
          onChange={e => {
            setPageSize(Number(e.target.value))
          }}
        >
          {[5, 10, 20].map(pageSize => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
       {/* <pre>
        <code>{JSON.stringify(state, null, 2)}</code>
        </pre> */}
      </div>  
        {/* {show && <CreateGoalModal handleClose={handleShowCreate} */}
        {showCreateGoalModal && <CreateGoalModal handleClose={() => {setShowCreateGoalModal(false)}} addGoal={(goal) => addGoal(goal)}/>}
        {showGoalActionModal && <SelectGoalActionModal CanEdit = {localStorage.getItem('EmpID') == EditGoal} setShowCommentModal = {setShowCommentModal} setShowEditGoalModal = {setShowEditGoalModal} handleClose={() => {setShowGoalActionModal(false)}}/>}
        {showCommentModal && <Comments GoalID = {GoalID} handleClose={() => setShowCommentModal(false)} />}
        {showEditGoalModal && <EditGoalModal GoalID = {GoalID} handleClose={() => {setShowEditGoalModal(false)}}/>}

    </>
  )
}

export default Table;