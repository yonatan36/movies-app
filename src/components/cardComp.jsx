import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import DeleteIcon from "@mui/icons-material/Delete";
import StarRating from "./StarRatingComp";
import CardDialog from "../components/DialogsPopups/CardDialog";
import EditIcon from "@mui/icons-material/Edit";
import FavoriteIcon from "@mui/icons-material/Favorite";
import axios from "axios";
import { useState } from "react";

import {
  Card,
  CardActionArea,
  CardMedia,
  Typography,
  Button,
  Box,
  IconButton,
} from "@mui/material";
import PropTypes from "prop-types";

const CardComponent = ({
  img,
  title,
  description,
  id,
  onDelete,
  canDelete,
  onEdit,
  canEdit,
  onRemoveLikes,
  isLiked,
  likes,
  notConnected,
  isMyCard,
}) => {
  const [open, setOpen] = useState(false);
  const [likeState, setLikesState] = useState(isLiked);
  const [like, setLikes] = useState(likes.length);
  const [isHovered, setIsHovered] = useState(false);

  const handleLikeBtnClick = async (event) => {
    event.stopPropagation(); // Stop event propagation
    try {
      const response = await axios.patch("/cards/card-likes/" + id);
      const updatedLikes = response.data.likes.length;
      setLikes(updatedLikes);
      setLikesState((prevState) => !prevState);
      onRemoveLikes(id);
    } catch (err) {
      console.log(err);
    }
  };

  const handleEditBtnClick = (event) => {
    event.stopPropagation(); // Stop event propagation
    onEdit(id);
  };

  const handleDeleteBtnClick = (event) => {
    event.stopPropagation(); // Stop event propagation
    onDelete(id);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Card
      square
      raised
      sx={{
        "&:hover .card-image": {
          filter: "brightness(0.5)", // Adjust the brightness value as needed
        },
      }}
    >
      <CardActionArea
        onClick={handleOpen}
        sx={{
          position: "relative",
          "&:hover .hover-element": {
            opacity: 1,
          },
        }}
      >
        <CardMedia
          height="400"
          component="img"
          image={img}
          className="card-image"
          sx={{
            filter: "brightness(100%)",
            transition: "filter 0.3s ease-in-out",
          }}
        />

        {isMyCard && (
          <Typography
            sx={{
              position: "absolute",
              top: "90%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              backgroundColor: "red",
              color: "white",
              padding: "5px 8px",
              borderRadius: "5px",
              transition: "all 0.2s ease-in-out",
              "&:hover": {
                transform: "translate(-50%, -50%) scale(1.1)",
                boxShadow: "0px 2px 4px rgba(0, 0, 1, 0.95)",
              },
            }}
          >
            Your movie!
          </Typography>
        )}
        <Typography
          variant="h5"
          className="hover-element"
          sx={{
            position: "absolute",
            top: "2%",
            width: "100%",
            color: "#fff",
            padding: "8px",
            zIndex: 1,
            textAlign: "center",
            fontWeight: "bold",
            opacity: 0,
            transition: "opacity 0.3s ease",
          }}
        >
          {title}
        </Typography>

        <Typography
          className="hover-element"
          sx={{
            position: "absolute",
            top: "14%",
            width: "100%",
            color: "#fff",
            padding: "8px",
            zIndex: 1,
            textAlign: "center",
            fontWeight: "bold",
            opacity: 0,
            transition: "opacity 0.3s ease",
          }}
        >
          {description}
        </Typography>

        <Button
          className="hover-element media-play-btn"
          variant="contained"
          color="error"
          sx={{
            display: "flex",
            opacity: 0,
            transition: "opacity 0.3s ease",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            "& .MuiButton-startIcon": { marginRight: "-4px" },
          }}
        >
          <PlayArrowIcon />
        </Button>

        <Box
          className="hover-element"
          sx={{
            position: "absolute",
            top: "65%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 2,
            opacity: 0,
            transition: "opacity 0.3s ease",
          }}
        >
          <StarRating />
        </Box>

        <Box
          className="hover-element"
          sx={{
            position: "absolute",
            top: "75%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 2,
            opacity: 0,
            transition: "opacity 0.3s ease",
          }}
        >
          {!notConnected && (
            <IconButton
              color="primary"
              onClick={handleLikeBtnClick}
              sx={{
                color: likeState ? "red" : "white",
                transition: "all 0.2s ease-in-out",
                "&:hover": {
                  transform: "scale(1.5) scale(1)",
                  boxShadow: "0px 2px 4px rgba(0, 0, 1, 0.95)",
                },
              }}
            >
              <FavoriteIcon className="fav" />
            </IconButton>
          )}
          {canEdit && (
            <IconButton
              onClick={handleEditBtnClick}
              sx={{
                color: "white",
                transition: "all 0.2s ease-in-out",
                "&:hover": {
                  transform: "scale(1.5) scale(1)",
                  boxShadow: "0px 2px 4px rgba(0, 0, 1, 0.95)",
                },
              }}
            >
              <EditIcon />
            </IconButton>
          )}
          {canDelete && (
            <IconButton
              onClick={handleDeleteBtnClick}
              sx={{
                color: "white",
                transition: "all 0.2s ease-in-out",
                "&:hover": {
                  transform: "scale(1.5) scale(1)",
                  boxShadow: "0px 2px 4px rgba(0, 0, 1, 0.95)",
                },
              }}
            >
              <DeleteIcon />
            </IconButton>
          )}
        </Box>
      </CardActionArea>
      <CardDialog
        open={open}
        onClose={handleClose}
        img={img}
        title={title}
        description={description}
      />
    </Card>
  );
};

CardComponent.propTypes = {
  img: PropTypes.string.isRequired,
};

export default CardComponent;
