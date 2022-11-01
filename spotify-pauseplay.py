from xml.sax.handler import feature_external_ges
import requests
from pprint import pprint
import time
from tkinter import *


running = True
idx = 0
SPOTIFY_GET_CURRENT_TRACK_URL = "https://api.spotify.com/v1/me/player"
SPOTIFY_ACCESS_TOKEN = 'BQCxlQPFC22OQ-559EaaMQ02P3gMlp3R9nUAaFoLgx-xsnphYKgldN3NQG7aBlKxkgCncOwmTBGqdPIyq785v2UCC-ocIOyt2xYeIpa2t7kyEbBICCSsEAiIpbsfe6CBrAfiZBgvGLzGvoeiigPHVuURZE4vtq3jvHKLI491y22AF-V2afI'
SPINITRON_API_KEY = 'GP1jG2PXQBku1JZDOOFQIDwM'
SPINITRON_API_URL = 'https://spinitron.com/api/spins?access-token='+SPINITRON_API_KEY

# def start():
#     global running
#     running = True

# def stop():
#     global running
#     running = False

def post_to_spinitron(song_name, artists):
    
    data_json = {
        "song": song_name,
        "artist": artists
    }
    response_spin = requests.post(
        SPINITRON_API_URL, 
        data_json
    )
    return response_spin.text

def get_current_track(access_token):
    response = requests.get(
        SPOTIFY_GET_CURRENT_TRACK_URL,
        headers={
            "Authorization": f"Bearer {access_token}"
        }
    )
    try:
        resp_json = response.json()

        track_id = resp_json['item']['id']
        track_name = resp_json['item']['name']
        artists = resp_json['item']['artists']
        pause_status = resp_json['is_playing']
        shuff_status = resp_json['shuffle_state']
        artist_name = ', '.join(
            [artist['name'] for artist in artists]
        )
        link = resp_json['item']['external_urls']['spotify']

        current_track_info = {
            "id": track_id,
            "name": track_name,
            "artists": artist_name,
            "link": link,
            "play": pause_status,
            "shuffle":shuff_status
        }
        return current_track_info

    except:
        current_track_info['play']= False
        return current_track_info





def main():

    # root = Tk()
    # root.title("Title")
    # root.geometry("500x500")

    # app = Frame(root)
    # app.grid()

    # start_button = Button(app, text="Start Robot",command=start)
    # stop_button = Button(app, text = "Stop Robot", command=stop)

    # start_button.grid()
    # stop_button.grid()
    current_track_info = get_current_track(
                SPOTIFY_ACCESS_TOKEN
            )

    while True:

        if current_track_info['play']:
            pprint(current_track_info, indent=4)

            pastebin_url = post_to_spinitron(current_track_info["name"], current_track_info["artists"])
            print(f"Response is {pastebin_url}")
        else:
            print("Hit play on Spotify!")

        time.sleep(2)

        try:
            current_track_info = get_current_track(
                SPOTIFY_ACCESS_TOKEN
            )
        except:
            pass


    # while True:
    #     if idx % 500 == 0:
    #         root.update()
    #     if running:
    #         print("hello")
    #         idx += 1


if __name__ == '__main__':
    main()