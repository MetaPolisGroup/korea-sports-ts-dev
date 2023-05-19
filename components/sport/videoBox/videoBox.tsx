import React from "react";

import classes from "./VideoBox.module.css";

interface VideoBoxProps {
  loop?: boolean;
  muted?: boolean;
  autoPlay?: boolean;
  className?: string;
  linkVideo?: string;
  controls?: boolean;
  videoBoxClass?: string;
  modeFullBackground?: boolean;
}

const VideoBox: React.FC<VideoBoxProps> = (props) => {
  const videoProps = {
    loop: props?.loop,
    muted: props?.muted,
    autoPlay: props?.autoPlay,
    controls: props?.controls,
    className: `${classes.videoStyle} ${props?.className}`,
    videoboxclassname: props.videoBoxClass,
  };

  const message = "Your browser does not support the video tag.";

  if (props?.linkVideo === "") return null;

  if (props?.modeFullBackground)
    return (
      <div className={classes.boxFullBackground}>
        <video {...videoProps} className={classes.fullBackground}>
          <source src={props?.linkVideo} type="video/mp4" />
          {message}
        </video>
      </div>
    );

  return (
    <div className={videoProps.videoboxclassname}>
      <video {...videoProps}>
        <source src={props?.linkVideo} type="video/mp4" />
        {message}
      </video>
    </div>
  );
};

export default VideoBox;

VideoBox.defaultProps = {
  loop: true,
  muted: true,
  className: "",
  autoPlay: true,
  linkVideo: "",
  controls: false,
  modeFullBackground: false,
};
