import React from 'react';
import { GrEdit } from 'react-icons/gr';
import { RiDeleteBinLine } from 'react-icons/ri';

const Solution = ({ history, solution, deleteHandler }) => {
  return (
    <div className='solution'>
      <div className='solution__header'>
        <h1 className='solutionDiv__title'>{solution.title}</h1>
        <div className='solution__header-links'>
          <button
            onClick={() => history.push(`/manageSolution/${solution._id}`)}
          >
            <GrEdit className='header__icons' />
          </button>
          <button onClick={() => deleteHandler(solution._id)}>
            <RiDeleteBinLine className='header__icons' />
          </button>
        </div>
      </div>
      <div
        className='solutionDiv__description'
        dangerouslySetInnerHTML={{
          __html: solution.description,
        }}
      ></div>
    </div>
  );
};

export default Solution;
