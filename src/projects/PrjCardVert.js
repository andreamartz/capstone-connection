import React, { useContext } from 'react';
import clsx from 'clsx';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import CapConApi from '../api/api';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import DeleteOutlineRoundedIcon from '@material-ui/icons/DeleteOutlineRounded';
import Divider from '@material-ui/core/Divider';
import { Link as ReactRouterDomLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Avatar, IconButton, Typography } from '@material-ui/core';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import ModeCommentOutlinedIcon from '@material-ui/icons/ModeCommentOutlined';
import Tags from '../tags/Tags';
import { pgTimeToDate } from '../utils';
import './PrjCardVert.css';
import '../tags/Tags.css';
import UserContext from '../auth/UserContext';

const useStyles = makeStyles((theme) => ({
	actions: {
		display: 'flex',
		justifyContent: 'space-between',
		paddingLeft: theme.spacing(2),
		paddingRight: theme.spacing(2),
		marginBottom: theme.spacing(1),
	},
	deleteButton: {
		color: '#ff4025',
		minWidth: 'fit-content',
	},
	iconButton: {
		padding: '0',
	},
	date: {
		fontSize: theme.spacing(1.5),
	},
	avatar: {
		marginRight: theme.spacing(2),
	},
	large: {
		width: theme.spacing(6),
		height: theme.spacing(6),
	},
	link: {
		textDecoration: 'none',
		'&:hover': {
			textDecoration: 'underline',
		},
		fontWeight: 'bold',
	},
}));

const PrjCardVert = ({ toggleLike, project, projects, setProjects }) => {
	const {
		id,
		name,
		image,
		description,
		feedbackRequest,
		createdAt,
		likesCount,
		prjCommentsCount,
		creator,
		tags,
	} = project;

	const { currentUser } = useContext(UserContext);
	const dateCreated = pgTimeToDate(createdAt);
	const classes = useStyles();

	const deleteProject = async () => {
		await CapConApi.deleteProject({ id });
		const newProjects = projects.filter((project) => project.id !== id);
		setProjects(newProjects);
	};
	return (
		<Card elevation={3}>
			<ReactRouterDomLink to={`/projects/${id}`}>
				<CardMedia component="img" image={image} alt="" />
			</ReactRouterDomLink>
			<Divider variant="fullWidth" />
			<CardContent>
				<Box mb={2}>
					<Typography
						component="h3"
						variant="subtitle2"
						className={classes.date}
					>
						Created: {dateCreated}
					</Typography>
				</Box>

				<Box display="flex" paddingBottom="1rem" justifyContent="space-between">
					<Box
						display="flex"
						alignItems="center"
						fontSize="h6.fontSize"
						fontWeight="fontWeightBold"
						lineHeight="normal"
					>
						<ReactRouterDomLink to={`/projects/${id}`} className={classes.link}>
							{name}
						</ReactRouterDomLink>
					</Box>
					<Box>
						{currentUser.id === creator.id && (
							<Button onClick={deleteProject} className={classes.deleteButton}>
								<DeleteOutlineRoundedIcon
									fontWeight="fontWeightBold"
									fontSize="medium"
								/>
							</Button>
						)}
					</Box>
				</Box>

				<Typography variant="body1">{description}</Typography>
			</CardContent>

			<CardActions className={classes.actions}>
				<Tags tags={tags} />

				<Box display="flex" align-items="center">
					<IconButton
						aria-label="like"
						className={classes.iconButton}
						onClick={toggleLike}
					>
						<FavoriteBorderIcon />
					</IconButton>
					<Box mx={1}>{likesCount}</Box>
					<ModeCommentOutlinedIcon mx={8} />
					<Box ml={1}>{prjCommentsCount}</Box>
				</Box>
			</CardActions>

			<Divider variant="middle" />

			<CardContent
				display="flex"
				justify-content="space-between"
				align-items="center"
			>
				<Box display="flex" justify-content="space-between">
					<Avatar
						src={creator.photoUrl}
						className={clsx(classes.large, classes.avatar)}
						alt="project creator"
					/>
					<Box display="flex" alignItems="center" fontWeight="fontWeightBold">
						<Typography>
							<ReactRouterDomLink
								className={classes.link}
								to={`/users/${creator.id}`}
							>
								{creator.firstName} {creator.lastName}
							</ReactRouterDomLink>
						</Typography>
					</Box>
				</Box>
			</CardContent>

			<Divider variant="middle" />
			<CardContent>
				<Typography>{feedbackRequest}</Typography>
			</CardContent>
		</Card>
	);
};

export default PrjCardVert;
