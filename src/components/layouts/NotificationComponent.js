import { addNotification, closeWebSocket } from "features/webSocketSlice";
import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

const NotificationComponent = ({ children }) => {
    const { wsUrl } = useSelector((state) => state.websocket);
    const dispatch = useDispatch();
    useEffect(() => {
        if (wsUrl) {
            const globalws = new WebSocket(wsUrl);
            globalws.onopen = () => {
                console.log("WebSocket connected");
            };
            globalws.onmessage = (event) => {
              const notification = JSON.parse(event.data);
              dispatch(addNotification(notification));
            };
            globalws.onclose = () => {
              console.log("WebSocket disconnected");
              dispatch(closeWebSocket());
            };
            return () => {
                // globalws.close();
            };
        }
    }, [wsUrl]);

    return <>{children}</>;
};

export default NotificationComponent;
