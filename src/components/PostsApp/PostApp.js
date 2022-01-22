import React, { useEffect, useState } from "react";
import {
  getPosts,
  addPosts,
  deletePost,
  editPost,
} from "../../store/Posts/PostSlice";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";

const PostApp = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [isDeletedId, setIsDeletedID] = useState("");

  const [editLoaderId, setEditLoaderId] = useState("");
  const [isEditId, setIsEditId] = useState("");

  const postsState = useSelector((state) => state.posts);
  const dltLoader = useSelector((state) => state.posts.deleteloader);
  const edtLoader = useSelector((state) => state.posts.editLoader);

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (name) {
      if (isEditId) {
        dispatch(editPost({ id: isEditId, name: name }));
        setIsEditId("");
        setEditLoaderId(isEditId);
      } else {
        dispatch(addPosts({ name: name }));
      }
    }
    setName("");
  };

  useEffect(() => {
    if (!dltLoader) {
      setIsDeletedID("");
    }
    if (!edtLoader) {
      setEditLoaderId("");
    }
  }, [dltLoader, edtLoader]);

  // DELETE LIST HANDLER
  const deleteHandler = (id) => {
    setIsDeletedID(id);
    dispatch(deletePost(id));
  };

  const editHandler = (lis) => {
    setIsEditId(lis.id);
    setName(lis.name);
  };

  // console.log("list: ", postsState.lists);

  return (
    <div className="post-page">
      <form onSubmit={submitHandler}>
        <div>
          <input
            type="text"
            placeholer="type name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button type="submit">ADD</button>
        </div>

        {/* ADD SPINNER */}
        {postsState.addLoader && <div className="loader "></div>}
      </form>

      {/* ALL ERROR MESSAGES */}
      {postsState.getError && (
        <div className="alert-msg">{postsState.getError}</div>
      )}
      {postsState.addError && (
        <div className="alert-msg">{postsState.addError}</div>
      )}
      {postsState.editError && (
        <div className="alert-msg">{postsState.editError}</div>
      )}
      {postsState.deleteError && (
        <div className="alert-msg">{postsState.deleteError}</div>
      )}

      <ul className="post-lists">
        {/* GET LOADER */}
        {postsState.getLoader && (
          <div className="center">
            <div className="loader "></div>
          </div>
        )}
        {postsState.lists &&
          postsState.lists.map((lis, idx) => (
            <li key={lis.id} className="post-item">
              <div>
                <span>{idx + 1}.</span> {lis.name}
              </div>
              <div className="icons-list">
                <span onClick={() => editHandler(lis)}>
                  {editLoaderId === lis.id ? (
                    <div className="edit-loader">
                      <div className="loader "></div>
                    </div>
                  ) : (
                    <AiOutlineEdit />
                  )}
                </span>
                <span onClick={() => deleteHandler(lis.id)}>
                  {isDeletedId === lis.id ? (
                    <div className="delete-loader">
                      <div className="loader "></div>
                    </div>
                  ) : (
                    <AiOutlineDelete />
                  )}
                </span>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default PostApp;
