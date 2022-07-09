# Import Functions from Helper Functions
from flask import *

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

@app.route('/', methods=["GET", "POST"])
def root():
    if request.method == "GET":
        return {'plastic': 2, 'clothings': 5, 'bottles': 9, 'human_hand': 0}
    elif request.method == "POST":
        file = request.json.file

        print(f"file:{file}")
        # file is base64 string of the uploaded image

        # convert base64 file into jpg before feeding into the model
        import base64

        imgdata = base64.b64decode(file)
        filename = 'some_image.jpg'  # I assume you have a way of picking unique filenames
        with open(filename, 'wb') as f:
            f.write(imgdata)

    # AI black magic stuff
    # @param ["https://tfhub.dev/google/openimages_v4/ssd/mobilenet_v2/1", "https://tfhub.dev/google/faster_rcnn/openimages_v4/inception_resnet_v2/1"]
    # @returns [detector, class_names]
    module_handle = "https://tfhub.dev/google/faster_rcnn/openimages_v4/inception_resnet_v2/1"

    detector = hub.load(module_handle).signatures['default']
    jpg_file_img = JPG_resize_image(filename, 256, 256, True)

    run_detector(detector, jpg_file_img)
# return {image: base64, items: [bottle, bottle, bottle, clothes]}
# LIST OF Recycle Items: plastic_bag, bottles, Wine glass, Tin can

if __name__ == "__main__":
    app.run(port=5500)

