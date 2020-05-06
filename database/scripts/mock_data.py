from argparse import ArgumentParser
import pymongo
import random
import time
import uuid

from lorem.text import TextLorem
import names

"""
	inMemoryUserDB = map[int]string{
		1: "Matt",
		2: "Matt"}
"""

class RandomModel:
  def _gen_id(self):
    return uuid.uuid4().hex

  def to_json(self):
    _json = {}
    for k,v in self.__dict__.items():
      if isinstance(v, RandomModel):
        v = v.to_json()
      elif isinstance(v, list) and isinstance(v[0], RandomModel):
        v = [x.to_json() for x in v]
      _json[k] = v
    return _json


# ---------------------- RESOURCE MODELS ------------------------- #
class RandomResourceModel(RandomModel):
  def __init__(self, comments):
    self._id = self._gen_id()
    self.title = TextLorem(srange=(2,5)).sentence()
    self.author = names.get_full_name()
    self.description = TextLorem(trange=(1,1)).text()
    self.viewers = random.randint(200, 10000)
    self.comments = [comments.pop()._id for _ in range(random.randrange(3, 6))]
    self.placeholder = "color-cloud"
    self.videoId = "O6Xo21L0ybE"
    self.image = "cpp-book"
    self.type = random.choice(("books", "articles", "videos"))


class RandomComment(RandomModel):
  def __init__(self, usr_list):
    self._id = self._gen_id()
    _user = random.choice(usr_list)
    self.user_id = _user._id
    self.author = _user.name
    self.date_posted = time.time() - random.randint(100, 10000000)
    self.content = TextLorem(srange=(8,20)).sentence()

# ---------------------- USER MODELS ------------------------- #

class RandomProject(RandomModel):
  def __init__(self):
    self._id = self._gen_id()
    self.title = self.title = TextLorem(srange=(2,5)).sentence()
    self.description = TextLorem(prange=(1,3)).paragraph()
    self.type = random.choice(("Code", "Writing"))
    self.phase = {
      "Code": random.choice(("Development", "Production")),
      "Writing": random.choice(("Drafting", "Published"))
    }[self.type]

class RandomSkill(RandomModel):
  def __init__(self):
    self._id = self._gen_id()
    self.level = random.randint(1,100)
    self.percent = random.randint(1,100)
    self.name = TextLorem(srange=(1,1)).sentence().split('.')[0]
    self.category = random.choice(("Software", "Soft Skills"))
    

class RandomCodeSubmission(RandomModel):
  def __init__(self):
    self._id = self._gen_id()
    self.submission = self.random_dirs()

  def random_dirs(self):
    return {
      self.random_lower(): {
        self.random_lower():{"ext": random.choice(('py', 'sh', 'go', 'js')), "code":self.random_code()} for _ in range(1,5)
      } for _ in range(1,6)
    }

  def random_lower(self):
    return TextLorem(srange=(1,1)).sentence().split('.')[0].lower()

  def random_file(self):
    file_ext = random.choice(('py', 'sh', 'go', 'js'))
    return f"{self.random_lower()}.{file_ext}"

  def random_code(self):
    return TextLorem(trange=(1,3)).text()


class RandomUserModel(RandomModel):
  def __init__(self, codes, skills, projs):
    self._id = self._gen_id()
    self.name = names.get_full_name()
    self.persona_lvl = random.randint(1, 99)
    self.code_submissions = [codes.pop()._id for _ in range(random.randrange(10, 20))]
    self.skills = [skills.pop()._id for _ in range(random.randrange(8, 14))]
    self.projects = [projs.pop()._id for _ in range(random.randrange(15, 40))]

def populate_data_into_collection(coll, data):
  for ind, record in enumerate(data):
    inserted_id = coll.insert_one(record.__dict__).inserted_id
    data[ind].inserted_id = inserted_id

def n_inits(n, Class, *args):
  return [Class(*args) for _ in range(n)]

class Database:
  def __init__(self, db):
    self.projects = db.get_collection("projects")
    self.code_submissions = db.get_collection("code-submissions")
    self.skills = db.get_collection("skills")
    self.users = db.get_collection("users")
    self.comments = db.get_collection("comments")
    self.resources = db.get_collection("resources")

  def drop_all(self):
    for coll in self.__dict__.values():
      coll.drop()

def mock():
  db = Database(database)
  projects = n_inits(100, RandomProject)
  populate_data_into_collection(db.projects, projects)

  code_submissions = n_inits(100, RandomCodeSubmission)
  populate_data_into_collection(db.code_submissions, code_submissions)

  skills = n_inits(100, RandomSkill)
  populate_data_into_collection(db.skills, skills)

  users = n_inits(2, RandomUserModel, code_submissions, skills, projects)
  populate_data_into_collection(db.users, users)

  comments = n_inits(100, RandomComment, users)
  populate_data_into_collection(db.comments, comments)

  resources = n_inits(2, RandomResourceModel, comments)
  populate_data_into_collection(db.resources, resources)
  

if __name__ == "__main__":
  client = pymongo.MongoClient(host="localhost:27018")
  database = client.get_database(name="bitboard-dev")

  parser = ArgumentParser()
  parser.add_argument("-d", "--delete", default=False, action="store_true")
  args = parser.parse_args()

  if args.delete:
    Database(database).drop_all()
  else:
    mock()