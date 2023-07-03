# [LeafletJS map layer and selection menu based on API input](https://www.upwork.com/jobs/~018823e0418cd7fa9a)

As a hobby project for our scout group i have build a 'game page' at https://www.geoclaim.nl to claim streets that are at the current location of the page visitor.

This 'game' exists of three steps:

1. Check on OSM data if there are road sections on the current location of the user.
   (via https://www.geoclaim.nl:8080/docs#/Streets/getstreets_api_v1_streets_getstreets_get
2. Claim the road sections that are just received from OSM (based on some business ruling and game settings).
   (via https://www.geoclaim.nl:8080/docs#/Streets/claim_streets_api_v1_streets_claimstreet_get
3. Show all the claimed road sections based on the current location.
   (via https://www.geoclaim.nl:8080/docs#/Streets/claim_streets_api_v1_streets_get_claim_street_get)

The data that is received from the get_claimed_street endpoint, contains a featureCollection which LineString features. Each feature contains the needed coordinates and a set of properties which correspond with a claim made by a user, see below:
"properties":
"search_id": 168,
"alliance_name": "Alliance East",
"team_name": "Team 10
"user_name": "User 1"
"claimed": "2022-11-04 09:55:50",
"strength": 100

The map overlay must be build based on those properties. The alliance-, team- and username are organised hierarchically. A user is part of a team and that team is then part of an alliance. Teams can exist without being members of an alliance (the alliance attribute is empty), see example below:

- Alliance East
- - Team 10
- - - User 1
- - - User 2
- - Team 12
- - - User 12
- - - User 34
- Alliance West
- - Team 2
- - - User 13
- - Team 1
- - - User 3
- - - User 5
- ""
- - Team 34
- - Team 52

Requirements:

- The users current geolocation (from browser) is used to call the get_claimed_street endpoint on page load
- The entire overlay (including the overlay filter menu) is hidable.
- If the 'Check' button is pressed, the entire layer overlay is hidden.
- If 'Claim' is completed, the layer overlay is shown again, including the latest claim (hence a new API call must be made)
- The overlay selection menu should be sleek, small and hidable (the map is mostly used on mobile phones and the manu will take a lot of screen space)
- All items on the overlay selection menu can be used separately while respecting the hierarchy. Thus, when a team is selected, all underlying users become visible on the map.
- On page load, all alliances, teams and users are shown on the map
- If there are 1 or 0 alliances in the available data, do not show the alliance in the overlay selection filter (only show if there are two alliances or more)
- Users are foldable/expandable in the overlay selection menu, and 'folded' on load. (so on page load we can see teams (and alliances if present))
- Every team has got it's own color.
- The color is somehow based on the team name (or their alphabetical order), so seperate users get the same color assigned to the teams that are on the map
- The colour should contrast well with the background map.
- The color cannot be orange (that colour is reserved for claiming streets)
- Every feature in the data, has got a strength property, this strengt property equals to the opacity of the color. (road sections degrade over time). Strength 100 = opacity 100%

# Sample Data

https://www.geoclaim.nl:8080/api/v1/streets/get_claim_street?map_id=1&lat=52.158462573821&lon=6.4088820899768&archived=true

`test.json`
