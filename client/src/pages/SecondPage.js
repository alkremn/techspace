import React, { useState } from 'react';
import Button from '../components/common/Button';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { cases as casesData } from '../data/casesData';
import Case from '../components/Case';

const move = (source, destination, droppableSource, droppableDestination) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);
  removed.status = droppableDestination.droppableId;

  const result = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;

  return result;
};

const SecondPage = () => {
  const [cases, setCases] = useState({
    new: casesData.filter(c => c.status === 'new'),
    inProgress: casesData.filter(c => c.status === 'inProgress'),
    completed: casesData.filter(c => c.status === 'completed'),
  });

  const onDragEndHandler = result => {
    const { source, destination } = result;

    // dropped outside the list
    if (!destination) return;

    if (source.droppableId === destination.droppableId) {
      return;
    }

    const sourceList = cases[source.droppableId];
    const destinationList = cases[destination.droppableId];
    result = move(sourceList, destinationList, source, destination);
    setCases({
      ...cases,
      ...result,
    });
  };

  return (
    <div className='secondPage'>
      <div className='secondPage__left'>
        <Button color='#635EF6' type='submit' height='40px'>
          Create New Case
        </Button>
      </div>
      <DragDropContext onDragEnd={onDragEndHandler}>
        <div className='secondPage__right'>
          <div className='secondPage__column'>
            <h1 className='second__header-title new'>New</h1>

            <Droppable droppableId='new'>
              {provided => (
                <ul
                  className='secondPage__list'
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {cases.new.map((item, index) => (
                    <Draggable
                      key={item._id}
                      draggableId={item._id}
                      index={index}
                      isDragDisabled={false}
                    >
                      {provided => (
                        <Case
                          className='case draggable'
                          draggableProps={provided.draggableProps}
                          dragHandleProps={provided.dragHandleProps}
                          innerRef={provided.innerRef}
                          id={item._id}
                          title={item.title}
                          caseNumber={item.caseNumber}
                          description={item.description}
                          createdDate={item.createdDate}
                          createdBy={item.title}
                          assignedTo={item.title}
                        />
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </ul>
              )}
            </Droppable>
          </div>
          <div className='secondPage__column'>
            <h1 className='second__header-title inProgress'>In Progress</h1>
            <Droppable droppableId='inProgress'>
              {provided => (
                <ul
                  className='secondPage__list'
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {cases.inProgress.map((item, index) => (
                    <Draggable
                      key={item._id}
                      draggableId={item._id}
                      index={index}
                    >
                      {provided => (
                        <Case
                          className='case draggable'
                          draggableProps={provided.draggableProps}
                          dragHandleProps={provided.dragHandleProps}
                          innerRef={provided.innerRef}
                          id={item._id}
                          title={item.title}
                          caseNumber={item.caseNumber}
                          description={item.description}
                          createdDate={item.createdDate}
                          createdBy={item.title}
                          assignedTo={item.title}
                        />
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </ul>
              )}
            </Droppable>
          </div>

          <div className='secondPage__column'>
            <h1 className='second__header-title complete'>Completed</h1>
            <Droppable droppableId='completed'>
              {provided => (
                <ul
                  className='secondPage__list'
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {cases.completed.map((item, index) => (
                    <Draggable
                      key={item._id}
                      draggableId={item._id}
                      index={index}
                    >
                      {provided => (
                        <Case
                          className='case draggable'
                          draggableProps={provided.draggableProps}
                          dragHandleProps={provided.dragHandleProps}
                          innerRef={provided.innerRef}
                          id={item._id}
                          title={item.title}
                          caseNumber={item.caseNumber}
                          description={item.description}
                          createdDate={item.createdDate}
                          createdBy={item.title}
                          assignedTo={item.title}
                        />
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </ul>
              )}
            </Droppable>
          </div>
        </div>
      </DragDropContext>
    </div>
  );
};

export default SecondPage;
