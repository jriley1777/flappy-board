## Flappy Board
A message board presented with split-flap display.

Board display at https://flappyboard.com rendered on desktop, wider devices.

Board admin at https://flappyboard.com rendered on mobile or at https://flappyboard.com/admin.

<div>
  <img src="https://firebasestorage.googleapis.com/v0/b/processing-editor.appspot.com/o/flapboard.gif?alt=media&token=34e60d48-9c86-4ac3-b8a2-380b1a4b0766" width="40%" />
</div>

Currently working on integrations and personalizing boards:

<div>
  <img src="https://firebasestorage.googleapis.com/v0/b/processing-editor.appspot.com/o/flap2.gif?alt=media&token=d22ac0db-0c80-456f-ba28-54d3b1d80ea6" width="40%" />
</div>

### Board Architecture
* GCP Schedulers
  * Data fetching
* Modes
  * Content 
  * Animation 
  * Picture 
  * Game
* Content Types
  * User-specific/authorized
  * Global
* Content Aggregation
  * Third Party Integrations
    * News, Spotify, etc.
  * Idle Messages
  * Native Content
    * Clock
  * Messaging
    * User stored messages
* Databases
  * Users
  * Content_options
  * User_content_options
  * Global_content
    * Contains last pull of global content
  * User_content
    * Contains current message
* Functions
  * authorize(user)
  * fetchMessage(user?)
  * setCurrentMessage(user)

### Data Flow
#### Global
  - Server
  1. Scheduler calls update data
  2. All global data fetched and updated in db.
  
  - Client
  3. Client requests updateMessage at interval
  4. User_content_options defines active data fetches
  5. setCurrentMessage updated from available options 
  6. Client observable on db should rerender view.
