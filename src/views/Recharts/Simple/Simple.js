import React, { useState } from "react";
import {
    Label,
    LineChart,
    Line,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    ReferenceArea,
    ResponsiveContainer,
} from "recharts";

import styles from "./Simple.module.scss";

import movies from "../../../data/movies";

const sortedMovies = movies.sort((a, b) => a.year - b.year);

const getAxisYDomain = (from, to, ref, offset, props) => {
    // const refData = sortedMovies.slice(from - 1, to);
    const refData = sortedMovies.filter((m) => m.year >= from && m.year <= to);
    let [bottom, top] = [refData[0][ref], refData[0][ref]];
    refData.forEach((d) => {
        if (d[ref] > top) top = d[ref];
        if (d[ref] < bottom) bottom = d[ref];
    });
    props.setFilteredMovies(refData);

    return [(bottom | 0) - offset, (top | 0) + offset];
};

const initialState = {
    data: sortedMovies,
    left: "dataMin",
    right: "dataMax+1",
    refAreaLeft: "",
    refAreaRight: "",
    top: "dataMax+1",
    bottom: "dataMin-1",
    top2: "dataMax+1",
    bottom2: "dataMin-1",
    animation: true,
};

const CustomTooltip = React.memo(({ active, payload, label }) => {
    if (active) {
        return (
            <div className={styles.tooltip}>
                <span>{payload[0].payload.title}</span>
                <span>TomatoMeter {payload[0].value}</span>
                <span>AudienceScore {payload[1].value}</span>
            </div>
        );
    }

    return null;
});

const Simple = React.memo((props) => {
    console.log("render");
    const [state, setState] = useState(initialState);
    const {
        data,
        barIndex,
        left,
        right,
        refAreaLeft,
        refAreaRight,
        top,
        bottom,
        top2,
        bottom2,
    } = state;

    const zoom = () => {
        let { refAreaLeft, refAreaRight, data } = state;

        if (refAreaLeft === refAreaRight || refAreaRight === "") {
            setState({
                ...state,
                refAreaLeft: "",
                refAreaRight: "",
            });
            return;
        }

        // xAxis domain
        if (refAreaLeft > refAreaRight)
            [refAreaLeft, refAreaRight] = [refAreaRight, refAreaLeft];

        // yAxis domain
        const [bottom, top] = getAxisYDomain(
            refAreaLeft,
            refAreaRight,
            "tomatoMeter",
            1,
            props
        );
        const [bottom2, top2] = getAxisYDomain(
            refAreaLeft,
            refAreaRight,
            "audienceScore",
            50,
            props
        );

        setState({
            ...state,
            refAreaLeft: "",
            refAreaRight: "",
            data: data.slice(),
            left: refAreaLeft,
            right: refAreaRight,
            bottom,
            top,
            bottom2,
            top2,
        });
    };

    const zoomOut = () => {
        const { data } = state;
        setState({
            data: data.slice(),
            refAreaLeft: "",
            refAreaRight: "",
            left: "dataMin",
            right: "dataMax",
            top: "dataMax+1",
            bottom: "dataMin",
            top2: "dataMax+50",
            bottom2: "dataMin+50",
        });
        props.setFilteredMovies([]);
    };

    return (
        <div style={{ userSelect: "none" }} className={props.className}>
            <button
                // href="javascript: void(0);"
                className="btn update"
                onClick={zoomOut}
            >
                Zoom Out
            </button>
            <ResponsiveContainer width="100%" height={400}>
                <LineChart
                    data={movies}
                    onMouseDown={(e) =>
                        setState({ ...state, refAreaLeft: e.activeLabel })
                    }
                    onMouseMove={(e) =>
                        state.refAreaLeft &&
                        setState({ ...state, refAreaRight: e.activeLabel })
                    }
                    onMouseUp={zoom}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                        allowDataOverflow
                        dataKey="year"
                        domain={[left, right]}
                        type="number"
                    />
                    <YAxis
                        orientation="right"
                        allowDataOverflow
                        domain={[0, 100]}
                        type="number"
                        yAxisId="1"
                    />
                    <YAxis
                        // orientation="right"
                        allowDataOverflow
                        domain={[0, 100]}
                        type="number"
                        yAxisId="2"
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Line
                        yAxisId="1"
                        type="natural"
                        dataKey="tomatoMeter"
                        stroke="#fca311"
                        animationDuration={300}
                    />
                    <Line
                        yAxisId="1"
                        type="natural"
                        dataKey="audienceScore"
                        stroke="#14213d"
                        animationDuration={300}
                    />
                    {refAreaLeft && refAreaRight ? (
                        <ReferenceArea
                            yAxisId="1"
                            x1={refAreaLeft}
                            x2={refAreaRight}
                            strokeOpacity={0.3}
                        />
                    ) : null}
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
});

export default Simple;
