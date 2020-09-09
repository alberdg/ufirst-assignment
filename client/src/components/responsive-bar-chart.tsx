import React from 'react';
import { ResponsiveBar } from '@nivo/bar'
import { RequestsByMinute } from '../interfaces/request-by-minute';

/**
 * Functional component representing a responsive bar
 * @function
 * @param data Chart data
 * @param keys Chart keys
 * @param indexBy Data field used to index by
 * @param bottomLegend Bottom legend text
 * @param leftLegend Left legend text
 * @returns component UGroupResponsiveBar component
 */
const UFirstGroupResponsiveBar = ({
    data,
    keys,
    indexBy,
    bottomLegend,
    leftLegend
  } :
  {
    data: RequestsByMinute[],
    keys: string[],
    indexBy: string,
    bottomLegend: string,
    leftLegend: string,
   }) => {
  return (
    <ResponsiveBar
        data={data}
        keys={keys}
        indexBy={indexBy}
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
        padding={0.3}
        groupMode="grouped"
        colors={{ scheme: 'paired' }}
        borderColor={{ from: 'color', modifiers: [ [ 'darker', 4.0 ] ] }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: bottomLegend,
            legendPosition: 'middle',
            legendOffset: 32
        }}
        axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: leftLegend,
            legendPosition: 'middle',
            legendOffset: -40
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}
        legends={[
            {
                dataFrom: 'keys',
                anchor: 'bottom-right',
                direction: 'column',
                justify: false,
                translateX: 120,
                translateY: 0,
                itemsSpacing: 2,
                itemWidth: 100,
                itemHeight: 20,
                itemDirection: 'left-to-right',
                itemOpacity: 0.85,
                symbolSize: 20,
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemOpacity: 1
                        }
                    }
                ]
            }
        ]}
        animate={true}
        motionStiffness={90}
        motionDamping={15}
    />
  )
}

export default UFirstGroupResponsiveBar;
