import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategoriesAction } from '../actions/categoriesActions';
import { BiSearch } from 'react-icons/bi';
import { Dimmer, Segment, Modal } from 'semantic-ui-react';
import { Loader } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
import { fetchSulotionsByCatIdAction } from '../actions/solutionsActions';
import Button from '../components/common/Button';
import { Button as ButtonSemantic } from 'semantic-ui-react';
import Solution from '../components/Solution';
import ListItemOption from '../components/ListItemOption';

const SolutionsPage = ({ history }) => {
  const dispatch = useDispatch();
  const { loading } = useSelector(state => state.async);
  const { categories } = useSelector(state => state.categories);
  const { solutions, solutionsLoading } = useSelector(state => state.solutions);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [selectedSolutionId, setSelectedSolutionId] = useState(null);
  const [selectedSolution, setSelectedSolution] = useState(null);

  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      dispatch(fetchCategoriesAction());
    };
    fetchData();
  }, [dispatch]);

  const selectCategoryHandler = async id => {
    setSelectedSolutionId(null);
    setSelectedSolution(null);
    setSelectedCategoryId(id);

    await dispatch(fetchSulotionsByCatIdAction(id));
  };
  const selectSolutionHandler = id => {
    setSelectedSolutionId(id);
    setSelectedSolution(solutions.find(s => s._id === id));
  };

  const deleteHandler = id => {
    console.log(id);
    setOpen(true);
  };

  if (loading)
    return (
      <Segment style={{ height: 'calc(100vh - 100px)' }}>
        <Dimmer active inverted>
          <Loader size='large'>Loading</Loader>
        </Dimmer>
      </Segment>
    );

  return (
    <div className='solutions'>
      <div className='category'>
        <h1 className='category__title'>Category</h1>
        <div className='category__list'>
          {categories.map(category => (
            <ListItemOption
              key={category._id}
              id={category._id}
              text={category.text}
              active={category._id === selectedCategoryId}
              action={selectCategoryHandler}
            />
          ))}
        </div>
      </div>
      {solutionsLoading ? (
        <Segment className='solution__loading'>
          <Dimmer active inverted className='solution__dimmer'>
            <Loader size='large'>Loading</Loader>
          </Dimmer>
        </Segment>
      ) : (
        <>
          <div className='solutions__searchDiv'>
            <div className='search__left'>
              <BiSearch className='search__icon' />
              <input type='search' placeholder='Search...' />
              <button type='button'>Search</button>
            </div>
            <NavLink to='/createSolution'>
              <Button
                className='createButton'
                color='#635EF6'
                type='submit'
                height='40px'
              >
                Create Solution
              </Button>
            </NavLink>
          </div>
          <div className='solutionTitles'>
            <h1 className='solutionTitles__title'>Solutions</h1>
            <div className='solutionTitles__list'>
              {selectedCategoryId &&
                solutions.length > 0 &&
                solutions.map(solution => (
                  <ListItemOption
                    key={solution._id}
                    id={solution._id}
                    text={solution.title}
                    active={solution._id === selectedSolutionId}
                    action={selectSolutionHandler}
                  />
                ))}
            </div>
          </div>
          {selectedSolution && (
            <Solution
              history={history}
              solution={selectedSolution}
              deleteHandler={deleteHandler}
            />
          )}
        </>
      )}
      <Modal size='mini' open={open} onClose={() => setOpen(false)}>
        <Modal.Header>Delete</Modal.Header>
        <Modal.Content>
          <p>Are you sure you want to delete solution?</p>
        </Modal.Content>
        <Modal.Actions>
          <ButtonSemantic negative onClick={() => setOpen(false)}>
            No
          </ButtonSemantic>
          <ButtonSemantic positive>Yes</ButtonSemantic>
        </Modal.Actions>
      </Modal>
    </div>
  );
};

export default SolutionsPage;
