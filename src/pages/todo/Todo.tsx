import React, { useState } from 'react'
import { TODO_STATUS } from './constant'

type TodoListState = {
  newItem: string
  items: {
    title: string
    status: TODO_STATUS
  }[]
  selectedItemIndex: number
  editingItemTitle: string
}

const StatusBadge = ({ status }: { status: TODO_STATUS }) => {
  // Determine the badge class based on the status
  const badgeClass =
    status === TODO_STATUS.IN_PROGRESS
      ? 'badge badge-primary'
      : 'badge badge-success'

  return (
    <div className='status'>
      <span className={badgeClass}>{status}</span>
    </div>
  )
}
const TodoList = () => {
  const [state, setState] = useState<TodoListState>({
    newItem: '',
    items: [],
    selectedItemIndex: -1,
    editingItemTitle: ''
  })

  const addItem = () => {
    if (state.newItem !== '') {
      setState((currentState) => ({
        ...currentState,
        items: [
          ...items,
          {
            title: state.newItem,
            status: TODO_STATUS.IN_PROGRESS
          }
        ],
        newItem: ''
      }))
    }
  }

  const onChangeNewItem = (e) => {
    setState((currentState) => ({
      ...currentState,
      newItem: e.target.value
    }))
  }

  const onChangeEditingItem = (e) => {
    setState((currentState) => ({
      ...currentState,
      editingItemTitle: e.target.value
    }))
  }

  const removeItem = (index: number) => {
    const updatedItems = [...items]
    updatedItems.splice(index, 1)
    setState((currentState) => ({
      ...currentState,
      items: updatedItems,
      newItem: ''
    }))
  }

  const onTriggerEditItem = (index: number) => {
    setState((currentState) => ({
      ...currentState,
      selectedItemIndex: index,
      editingItemTitle: state.items[index].title
    }))
  }

  const saveEdit = () => {
    const updatedItems = [...state.items]

    updatedItems[selectedItemIndex] = {
      title: editingItemTitle,
      status: state.items[selectedItemIndex].status
    }
    setState((currentState) => ({
      ...currentState,
      items: updatedItems,
      selectedItemIndex: -1,
      editingItemTitle: ''
    }))
  }

  const toggleComplete = (index: number) => {
    const updatedItems = [...state.items]
    updatedItems[index].status =
      updatedItems[index].status === TODO_STATUS.IN_PROGRESS
        ? TODO_STATUS.COMPLETED
        : TODO_STATUS.IN_PROGRESS
    setState((currentState) => ({
      ...currentState,
      items: updatedItems
    }))
  }

  const cancelEdit = () => {
    setState((currentState) => ({
      ...currentState,
      selectedItemIndex: -1,
      editingItemTitle: ''
    }))
  }

  const { newItem, items, selectedItemIndex, editingItemTitle } = state

  return (
    <>
      <div className='container'>
        <div className='page-inner'>
          <div className='page-header'>
            <h3 className='fw-bold mb-3'>To do List</h3>
          </div>
          <div className='row'>
            <div className='col-md-4 col-lg-12'>
              <div className='input-group mb-3'>
                <input
                  onChange={(e) => {
                    onChangeNewItem(e)
                  }}
                  value={newItem}
                  type='text'
                  className='form-control'
                  placeholder='What you are going to do?'
                />
                <button className='btn btn-primary' onClick={addItem}>
                  Add
                </button>
              </div>
              <div className='card card-round mt-4'>
                <div className='card-body'>
                  <div className='card-head-row card-tools-still-right'>
                    <div className='card-title'>List of Todo Items</div>
                  </div>
                  <div className='card-list py-4'>
                    {items.length === 0 ? (
                      <h6>There is no to-do item</h6>
                    ) : (
                      items.map((item, index) => {
                        return (
                          <div className='item-list' key={item.title}>
                            <div>
                              <input
                                className='form-check-input'
                                type='checkbox'
                                id={`completed-${index}`}
                                checked={item.status === TODO_STATUS.COMPLETED}
                                onChange={() => toggleComplete(index)}
                              />
                            </div>
                            <div className='info-user ms-3'>
                              {selectedItemIndex === index ? (
                                <div className='form-floating form-floating-custom mb-3 w-50'>
                                  <input
                                    value={editingItemTitle}
                                    onChange={(e) => {
                                      onChangeEditingItem(e)
                                    }}
                                    type='text'
                                    className='form-control'
                                    id='floatingInput'
                                    placeholder='name@example.com'
                                  />
                                  <label htmlFor='floatingInput'>
                                    Task title
                                  </label>
                                </div>
                              ) : (
                                <h6 className='fw-bold mb-1'>{item.title}</h6>
                              )}
                              <StatusBadge status={item.status} />
                            </div>
                            {selectedItemIndex === index ? (
                              <>
                                <button
                                  className='btn btn-icon btn-link op-8 me-1'
                                  onClick={() => {
                                    saveEdit()
                                  }}
                                >
                                  <i className='fas far fa-save'></i>
                                </button>
                                <button
                                  className='btn btn-icon btn-link op-8 me-1'
                                  onClick={() => {
                                    cancelEdit()
                                  }}
                                >
                                  <i
                                    className='fas fa-reply
'
                                  ></i>
                                </button>
                              </>
                            ) : (
                              <button
                                className='btn btn-icon btn-link op-8 me-1'
                                onClick={() => {
                                  onTriggerEditItem(index)
                                }}
                              >
                                <i className='fas fa-pen'></i>
                              </button>
                            )}
                            <button
                              className='btn btn-icon btn-link btn-danger op-8'
                              onClick={() => {
                                removeItem(index)
                              }}
                            >
                              <i
                                className='fas fa-trash
'
                              ></i>
                            </button>
                          </div>
                        )
                      })
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default TodoList
