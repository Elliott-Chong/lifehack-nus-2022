# Import Functions from Helper Functions
from flask import *
from flask_cors import CORS

import io
from funcs import display_image, display_json, download_and_resize_image, JPG_resize_image, draw_bounding_box_on_image, draw_boxes, test
import tensorflow as tf

import tensorflow_hub as hub

# For downloading the image.
import matplotlib.pyplot as plt
import tempfile
from six.moves.urllib.request import urlopen
from six import BytesIO

# For drawing onto the image.
import numpy as np
from PIL import Image
from PIL import ImageColor
from PIL import ImageDraw
from PIL import ImageFont
from PIL import ImageOps

# For measuring the inference time.
import time

# For converting to json format
import json
import base64

test(4, 5)


def load_img(path):
    img = tf.io.read_file(path)
    img = tf.image.decode_jpeg(img, channels=3)
    return img


def run_detector(detector, path):
    img = load_img(path)

    converted_img = tf.image.convert_image_dtype(img, tf.float32)[
        tf.newaxis, ...]
# INsert smt
    # detector_output = detector(converted_img, as_dict=True)
    # class_names = detector_output["detection_class_names"]
    # print(f"Class_Name:{class_names}")
    start_time = time.time()
    result = detector(converted_img)
    # print(f'First Result~!!!!!!:\n{result}')
    end_time = time.time()
    class_names = result["detection_class_entities"]

    result = {key: value.numpy() for key, value in result.items()}

    print(type(result))
    # output_json_2(result)
    # print(f"SECOND RESULT\n!!!!{result}")
    # print(type(class_names))
    print("Found %d objects." % len(result["detection_scores"]))
    print("Inference time: ", end_time-start_time)
    # print(f"results:{result}")
    print(f"class_names:{class_names}")
    image_with_boxes, dictionary = draw_boxes(
        img.numpy(), result["detection_boxes"],
        result["detection_class_entities"], result["detection_scores"])

    display_image(image_with_boxes)
    return (display_json(image_with_boxes, dictionary))


app = Flask(__name__)
CORS(app)


@app.route('/', methods=["GET", "POST"])
def root():
    if request.method == "GET":
        return {'plastic': 2, 'clothings': 5, 'bottles': 9, 'human_hand': 0}
    elif request.method == "POST":
        print('inside POST')
        # imgstring = request.json['file']
        # print('ah', type(imgstring))
        # return {'image': 'lsdkf;ajsd', 'items_detected': ['shirt', 'shirt', 'die', 'die', 'bottle']}

        # # Convert base64 string to image in temporary file
        # imgdata = base64.b64decode(imgstring)
        # print('FUCK',imgdata[0:5])
        # print('sd', type(imgdata))
        # _, filename2 = tempfile.mkstemp(
        #     suffix=".jpg", prefix=imgstring[5:10], dir='./temp')
        # print(f"filename2:{filename2}")
        # # filename = 'some_image.jpg'  # I assume you have a way of picking unique filenames
        # with open('./temp/help.jpg', 'wb') as f:
        #     f.write(imgdata)

        # print('after writing to file')
        # print(f"filename2:{type(filename2)}")
        # JPG_resize_image(filename2, 1280, 856, display=True)

    # AI black magic stuff
    # @param ["https://tfhub.dev/google/openimages_v4/ssd/mobilenet_v2/1", "https://tfhub.dev/google/faster_rcnn/openimages_v4/inception_resnet_v2/1"]
    # @returns [detector, class_names]
        module_handle = "https://tfhub.dev/google/faster_rcnn/openimages_v4/inception_resnet_v2/1"

        detector = hub.load(module_handle).signatures['default']

        # jpg_file_img = JPG_resize_image(filename2, 1280, 856, display=True)

        print('dad')
        response = run_detector(
            detector, './Image_testdata/SHirt_bottle_test_2.jpeg')
        # response = run_detector(
        #     detector, filename2)
        # print(response)
        return response
# return {image: base64, items: [bottle, bottle, bottle, clothes]}
# LIST OF Recycle Items: plastic_bag, bottles, Wine glass, Tin can


if __name__ == "__main__":
    app.run(port=5500)
