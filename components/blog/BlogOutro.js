import { useState } from "react";
import { Collapse } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";

import {
  postWriterAlongContents,
  writerAlongActions,
  selectors as writerAlongSelector,
} from "@/redux/slices/blog";
import { setSigninModal, setSubscriberUsageModal } from "@/redux/slices/ui";
import ToolTitleItem from "./components/ToolTitleItem";
import { ToolItem, TextItem } from "./styles";
import { BLOG_OUTRO, BLOG_HEADLINE } from "@/appconstants";
import { toastMessage } from "@/utils";
import { useUser, useSubscriberModal } from "@/hooks";
import { ToolAction, ToolInput } from "./styles";
import GenerateButton from "./components/GenerateButton";

const BlogOutro = ({ titleRef, aboutRef, quillRef }) => {
  const dispatch = useDispatch();
  const [suggestionNum, setSuggestionNum] = useState(1);
  const { isCurrentTask, isEmpty, items, loading } = useSelector(
    writerAlongSelector.getContentItem(BLOG_OUTRO)
  );
  const { headline, about } = useSelector(writerAlongSelector.getWriterAlong);

  const { isAuth } = useUser();
  const showSubscriberModal = useSubscriberModal();

  const trimedHeadline = headline.item.trim();
  const trimedAbout = about.item.trim();
  const validHeadline =
    trimedHeadline.length >= 10 && trimedHeadline.length <= 150;
  const validAbout = trimedAbout.length >= 10 && trimedAbout.length <= 200;

  const handleSubscriberModalOpen = (message) => {
    dispatch(setSubscriberUsageModal({ usage: true, message }));
  };

  const handleBlogOutro = () => {
    if (validHeadline && validAbout) {
      if (isAuth) {
        if (showSubscriberModal) {
          return handleSubscriberModalOpen();
        }

        dispatch(
          postWriterAlongContents({
            task: BLOG_OUTRO,
            data: {
              task: BLOG_OUTRO,
              headline: headline.item,
              numberOfSuggestions: suggestionNum,
              about: about.item,
            },
          })
        );
      } else {
        dispatch(setSigninModal(true));
      }
    } else {
      if (!validHeadline) {
        titleRef.current?.focus();
        toastMessage.customWarn("Blog headline required", 3000, {
          toastId: "headline",
        });
      } else if (!validAbout) {
        aboutRef.current?.focus();
        toastMessage.customWarn("Blog about required", 3000, {
          toastId: "about",
        });
      }
    }
  };

  const handleSelectItem = (item) => {
    quillRef.setText(item);
    dispatch(writerAlongActions.setOutro({ item }));
    dispatch(writerAlongActions.setCurrentTask(BLOG_HEADLINE));
  };

  return (
    <ToolItem>
      <ToolTitleItem
        text="Blog Outro"
        isActive={isCurrentTask}
        currentTask={BLOG_OUTRO}
      />

      <Collapse isOpen={isCurrentTask}>
        <ToolAction>
          <ToolInput>
            <p>Number of Suggestions</p>
            <input
              type="number"
              min={1}
              max={5}
              onChange={(e) => setSuggestionNum(e.target.value)}
              value={suggestionNum}
            />
          </ToolInput>
          <GenerateButton loading={loading} onClick={handleBlogOutro} />
          {!isEmpty &&
            items.map((item, index) => (
              <TextItem onClick={() => handleSelectItem(item)} key={index}>
                {item}
              </TextItem>
            ))}
        </ToolAction>
      </Collapse>
    </ToolItem>
  );
};

export default BlogOutro;
