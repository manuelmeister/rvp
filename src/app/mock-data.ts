import { Project } from './models';

let data:Project = {

  video: {
    id: null,
    url: 'http://www.sample-videos.com/video/mp4/240/big_buck_bunny_240p_1mb.mp4',
    meta: {
      filename: 'big_buck_bunny_240p_1mb.mp4'
    }
  },

  timeline: {
    duration: 5 * 60, // 5 min
    playhead: 1 * 60, // 1 min
    zoom: 1,
    pan: 0,
    tracks: [
      // 1st track
      {
        color: '#ff3d3d', // red
        fields: {
          title: 'Minute marks'
        },
        annotations: [
          {
            utc_timestamp: 60,
            duration: 0,
            fields: {
              title: '1 min',
              description: 'Marks one minute elapsed'
            }
          },
          {
            utc_timestamp: 120,
            duration: 0,
            fields: {
              title: '2 min',
              description: 'Marks two minutes elapsed'
            }
          },
          {
            utc_timestamp: 180,
            duration: 0,
            fields: {
              title: '3 min',
              description: 'Marks three minutes elapsed'
            }
          }
        ]
      },

      // 2nd track
      {
        color: '#2870f4', // blue
        fields: {
          title: 'Some durations'
        },
        annotations: [
          {
            utc_timestamp: 30,
            duration: 1,
            fields: {
              title: '1 sec',
              description: 'A one second long annotation'
            }
          },
          {
            utc_timestamp: 60,
            duration: 2,
            fields: {
              title: '2 secs',
              description: 'A two second long annotation'
            }
          },
          {
            utc_timestamp: 90,
            duration: 4,
            fields: {
              title: '4 secs',
              description: 'A four second long annotation'
            }
          },
          {
            utc_timestamp: 120,
            duration: 8,
            fields: {
              title: '8 secs',
              description: 'An eight second long annotation'
            }
          },
        ]
      },

      // 3nd track
      {
        color: '#f4bd28', // orange
        fields: {
          title: 'Mixed'
        },
        annotations: [
          {
            utc_timestamp: 15,
            duration: 0,
            fields: {
              title: 'A',
              description: "We call this annotation 'A'. It's a marker at 0:15 mins."
            }
          },
          {
            utc_timestamp: 30,
            duration: 10,
            fields: {
              title: 'B',
              description: "We call this annotation 'B'. It's at 0:30 mins and lasts 10 seconds."
            }
          },
          {
            utc_timestamp: 75,
            duration: 0,
            fields: {
              title: 'C',
              description: "We call this annotation 'C'. It's a marker at 1:15 mins."
            }
          },
          {
            utc_timestamp: 90,
            duration: 20,
            fields: {
              title: 'D',
              description: "We call this annotation 'D'. It's at 1:30 mins and lasts 20 seconds."
            }
          },
          {
            utc_timestamp: 135,
            duration: 0,
            fields: {
              title: 'E',
              description: "We call this annotation 'E'. It's a marker at 2:15 mins."
            }
          },
          {
            utc_timestamp: 150,
            duration: 30,
            fields: {
              title: 'F',
              description: "We call this annotation 'F'. It's at 2:30 mins and lasts 30 seconds."
            }
          },
          {
            utc_timestamp: 195,
            duration: 0,
            fields: {
              title: 'G',
              description: "We call this annotation 'G'. It's a marker at 3:15 mins."
            }
          }
        ]
      }
    ]
  }

};

export default data;
