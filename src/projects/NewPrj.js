import React, { useState, useRef, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import CapConApi from '../api/api';
import LoadingSpinner from '../common/LoadingSpinner';
import AlertDisplay from '../common/AlertDisplay';
import Checkbox from '@material-ui/core/Checkbox';
// import Alert from "../common/Alert";
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import AddIcon from '@material-ui/icons/Add';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import UserContext from '../auth/UserContext';
import './NewPrj.css';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(16),
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    height: 'auto',
    width: '40rem',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.warning.main,
  },
  prjImage: {
    height: '300px',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  textField: {
    marginBottom: theme.spacing(2),
  },
}));

// CHECK:
// 1. Add form validations with Material UI Formik (see Net Ninja Material UI tut video #28)
// 2. Consider pulling handleChange, handleFileInputChange, and handleSubmit into separate helper functions file(s).

const NewPrj = () => {
  const { currentUser } = useContext(UserContext);

  const INITIAL_STATE_FORM_DATA = {
    name: '',
    description: '',
    image: '',
    creatorId: currentUser.id,
    tags: [],
    repoUrl: '',
    siteUrl: '',
    feedbackRequest: '',
  };

  const [formData, setFormData] = useState(INITIAL_STATE_FORM_DATA);
  const [fileInputState, setFileInputState] = useState('');
  const [formErrors, setFormErrors] = useState([]);
  const [dbTags, setDbTags] = useState([]);
  const classes = useStyles();
  const history = useHistory();
  const fileInputRef = useRef();

  useEffect(function getTagsOnMount() {
    async function getAllTagsOnMount() {
      const dbTags = await CapConApi.getTags();
      setFormData((current) => ({
        ...current,
        tags: dbTags.map((tag) => ({ ...tag, checked: false })),
      }));
      setDbTags(dbTags);
    }
    getAllTagsOnMount();
  }, []);

  if (!dbTags) return <LoadingSpinner />;

  /** Update form data field */
  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setFormData((data) => ({ ...data, [name]: value }));
  };

  const toggleCheckboxValue = (evt) => {
    const { name, checked } = evt.target;

    // set checked status on FormData for the tag that changed
    setFormData((data) => ({
      ...data,
      tags: data.tags.map((tag) => {
        if (tag.id === Number(name)) {
          return { ...tag, checked };
        }
        return tag;
      }),
    }));
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    updateImageState(file);
  };

  const updateImageState = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file); // converts file contents to a base 64 encoded image
    reader.onloadend = () => {
      setFormData((data) => ({ ...data, image: reader.result }));
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const tags = formData.tags
      .filter((tag) => tag.checked)
      .map((tag) => tag.id);
    const project = { ...formData, tags };
    const result = await CapConApi.addProject(project);

    if (result.id) {
      history.push('/projects');
    } else {
      setFormErrors(result.error);
    }
  };

  if (!dbTags) return <LoadingSpinner />;

  return (
    <Paper className={classes.paper} elevation={5} component="main">
      <Avatar className={classes.avatar}>
        <AddIcon />
      </Avatar>
      <Box py={4}>
        <Typography component="h1" variant="h5">
          Add a New Project
        </Typography>
      </Box>

      <form onSubmit={handleSubmit} className={classes.form}>
        <TextField
          className={classes.textField}
          type="text"
          name="name"
          label="Project name"
          variant="outlined"
          value={formData.name}
          fullWidth
          required
          onChange={handleChange}
        />
        <TextField
          className={classes.textField}
          type="text"
          name="repoUrl"
          label="URL of code repository"
          variant="outlined"
          value={formData.repoUrl}
          fullWidth
          onChange={handleChange}
        />
        <TextField
          className={classes.textField}
          type="text"
          name="siteUrl"
          label="URL where app is deployed"
          variant="outlined"
          value={formData.siteUrl}
          fullWidth
          required
          onChange={handleChange}
        />
        <TextField
          className={classes.textField}
          type="text"
          name="description"
          label="Project Description"
          variant="outlined"
          value={formData.description}
          fullWidth
          onChange={handleChange}
        />
        <TextField
          className={classes.textField}
          type="text"
          name="feedbackRequest"
          label="What specific feedback would you like to receive?"
          variant="outlined"
          value={formData.feedbackRequest}
          multiline
          fullWidth
          onChange={handleChange}
        />
        {dbTags.map((t, idx) => (
          <FormControlLabel
            idx={idx}
            key={t.id}
            control={
              <Checkbox
                idx={idx}
                checked={formData.tags[idx].checked}
                name={t.id}
                onChange={toggleCheckboxValue}
              />
            }
            label={t.text}
          />
        ))}
        <Box mt={2} mb={4}>
          <Box display="flex" alignItems="center">
            <Box mr={2}>
              <Typography className={classes.typography}>
                Photo to represent project
              </Typography>
            </Box>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => fileInputRef.current.click()}
            >
              Choose File
            </Button>
            <input
              id="fileInput"
              ref={fileInputRef}
              type="file"
              name="image"
              onChange={handleFileInputChange}
              value={fileInputState}
            />
          </Box>
        </Box>

        {/* Preview the selected image */}
        <Box my={2}>
          {formData.image && (
            <img
              src={formData.image}
              alt="chosen"
              className={classes.prjImage}
            />
          )}
        </Box>
        {formErrors.length ? (
          <AlertDisplay severity="error" messages={formErrors} />
        ) : null}
        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          type="submit"
          fullWidth
          size="large"
        >
          Submit
        </Button>
      </form>
    </Paper>
  );
};

export default NewPrj;
