import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input, Dropdown, Label } from 'semantic-ui-react';
import { EditorState, convertToRaw } from 'draft-js';
import Button from '../components/common/Button';
import { categories } from '../data/categories';
import { Editor } from 'react-draft-wysiwyg';
import draftToMarkdown from 'draftjs-to-markdown';
import { createSolutionAction } from '../actions/solutionsActions';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const editorIsValid = blocks => {
  for (let block of blocks) {
    if (block.text.trim()) return true;
  }
  return false;
};

const AddSolutionPage = ({ history }) => {
  const dispatch = useDispatch();
  const { loading } = useSelector(state => state.solutions);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [selectedCategory, setSelectedCategory] = useState('');
  const [title, setValue] = useState('');

  const editorStateChange = newState => {
    setEditorState(newState);
  };

  const saveHandler = e => {
    e.preventDefault();
    const markdown = draftToMarkdown(
      convertToRaw(editorState.getCurrentContent())
    );
    console.log(markdown);

    // const solution = {
    //   title,
    //   categoryId: selectedCategory,
    //   description: draftToMarkdown(
    //     convertToRaw(editorState.getCurrentContent())
    //   ),
    // };
    // dispatch(createSolutionAction(solution));
  };

  return (
    <div className='createSolution'>
      <div className='createSolution__mainDiv'>
        <div className='createSolution__header'>
          <h1>Add Solution</h1>
        </div>
        <Form className='createSolution__form' action=''>
          <div className='form__category'>
            <Form.Field>
              <Dropdown
                selection
                onChange={(e, data) => setSelectedCategory(data.value)}
                placeholder='Select existing category'
                options={categories}
              />
              <Label basic color='red' pointing>
                Please enter a value
              </Label>
            </Form.Field>
            <span>or</span>
            <Form.Field>
              <Input
                id='title'
                size='small'
                className='category__input'
                placeholder='Create New Category'
                onChange={(e, data) => console.log(data.value)}
              />
              <Label basic color='red' pointing>
                Please enter a value
              </Label>
            </Form.Field>
          </div>
          <Form.Field>
            <Input
              id='title'
              size='small'
              placeholder='Title'
              type='text'
              error
              className='title__input'
              onChange={(e, data) => setValue(data.value)}
            />
            <Label basic color='red' pointing>
              Please enter a value
            </Label>
          </Form.Field>
          <div className='editor__container'>
            <Editor
              className='editor'
              editorState={editorState}
              wrapperClassName='editor__wrapper'
              editorClassName='editor__editorDiv'
              toolbarClassName='editor__toolbar'
              onEditorStateChange={editorStateChange}
            />
          </div>
          <div className='form__buttons'>
            <Button
              loading={loading}
              className='form__saveButton'
              color='#2D9CDB'
              title='Save'
              type='submit'
              inverted
              onClick={e => saveHandler(e)}
            >
              Save
            </Button>
            <Button
              title='Cancel'
              titleColor='black'
              onClick={e => history.push('/solutions')}
            >
              Cancel
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default AddSolutionPage;
