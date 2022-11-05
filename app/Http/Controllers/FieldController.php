<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class FieldController extends Controller {
    protected $imagePath = 'uploads/field_images/';

    public function getTheme($username) {
        $style = DB::table('themes')
            ->join('users', 'themes.user_id', 'users.id')
            ->where('username', '=', $username)
            ->first();

        if (empty($style)) {
          $response = [
            'success' => false,
            'message' => 'style not found'
          ];
          return response()->json($response, 200);
        }
        $response = [
          'success' => true,
          'json' => $style->json
        ];
        return response()->json($response, 200);
    }

    public function getLinks($username) {
        return DB::table('links')
            ->join('users', 'links.user_id', 'users.id')
            ->where('users.username', '=', $username)
            ->get();
    }

    public function getImageGallery($id) {
        return DB::table('image_gallery')
            ->where('user_id', '=', $id)
            ->get();
    }

    public function getImages($username) {
        return DB::table('images')
            ->join('users', 'images.user_id', 'users.id')
            ->where('users.username', '=', $username)
            ->get();
    }

    public function getContacts($username) {
        return DB::table('contacts')
            ->join('users', 'contacts.user_id', 'users.id')
            ->where('users.username', '=', $username)
            ->get();
    }

    public function getVideos($username) {
        return DB::table('videos')
            ->join('users', 'videos.user_id', 'users.id')
            ->where('users.username', '=', $username)
            ->get();
    }

    public function getEmails($username) {
        return DB::table('emails')
            ->join('users', 'emails.user_id', 'users.id')
            ->where('users.username', '=', $username)
            ->get();
    }

    public function getFields($username) {
        return DB::table('fields')
            ->join('users', 'fields.user_id', 'users.id')
            ->where('users.username', '=', $username)
            ->orderBy('position_id')
            ->get();
    }

    public function uploadImage(Request $req, $id) {
        if ($req->hasFile('u_image')) {
            $uuid = Str::uuid()->toString();
            $req->u_image->move(public_path($this->imagePath), $uuid . '_img.png');
            DB::table('image_gallery')
                ->insert(
                    ['user_id' => $id, 'image' => $uuid . '_img.png']
                );
        }
    }

    public function updateTheme(Request $req, $id) {
        $json = $req->all();

        DB::table('themes')
            ->where('user_id', $id)
            ->update(
                ['json' => $json]
            );
        return "updated";
    }

    public function updateLinks(Request $req, $id) {
        $links = $req->all();
        var_dump($links);

        foreach ($links as $key => $link) {
            DB::table('links')
                ->updateOrInsert(
                    ['user_id' => $link['userId'], 'props_id' => $link['propsId']],
                    ['title' => $link['title'], 'value' => $link['value']]
                );
        }
    }

    public function updateVideos(Request $req, $id) {
        // return $req;
        $videos = $req->all();
        foreach ($videos as $key => $video) {
            DB::table('videos')
                ->updateOrInsert(
                    ['user_id' => $video['userId'], 'props_id' => $video['propsId']],
                    ['title' => $video['title'], 'value' => $video['value']]
                );
        }
    }

    public function updateContacts(Request $req, $id) {
        // return $req;
        $contacts = $req->all();
        foreach ($contacts as $key => $contact) {
            DB::table('contacts')
                ->updateOrInsert(
                    ['user_id' => $contact['userId'], 'props_id' => $contact['propsId']],
                    ['value' => $contact['value']]
                );
        }
    }

    public function updateEmails(Request $req, $id) {
        $emails = $req->all();
        foreach ($emails as $key => $email) {
            DB::table('emails')
                ->updateOrInsert(
                    ['user_id' => $email['userId'], 'props_id' => $email['propsId']],
                    ['title' => $email['title'], 'value' => $email['value']]
                );
        }
    }

    public function updateImages(Request $req, $id) {
        $images = $req->all();

        foreach ($images as $key => $image) {
            DB::table('images')
                ->updateOrInsert(
                    ['user_id' => $image['userId'], 'props_id' => $image['propsId']],
                    ['title' => $image['title'], 'value' => $image['value']]
                );
        }
    }

    public function updatefields(Request $req, $id) {
        $fields = $req->all();

        foreach ($fields as $key => $field) {
            if ($field['deleted']) {
                $row = DB::table('fields')
                    ->where('user_id', '=', $field['userId'])
                    ->where('type', '=', $field['typeId'])
                    ->where('props_id', '=', $field['propsId'])
                    ->first();

                if ($row) {
                    $isDeleted = DB::table('fields')
                        ->where('user_id', '=', $field['userId'])
                        ->where('type', '=', $field['typeId'])
                        ->where('props_id', '=', $field['propsId'])
                        ->delete();
                    echo "isDeleted: " . $isDeleted . " x<br>";

                    $table_name = '';
                    if ($field["typeId"] == 1) {
                        $table_name = 'links';
                    } else if ($field["typeId"] == 2) {
                        $table_name = 'images';
                    } else if ($field["typeId"] == 3) {
                        $table_name = 'videos';
                    } else if ($field["typeId"] == 4) {
                        $table_name = 'contacts';
                    } else if ($field["typeId"] == 6) {
                        $table_name = 'emails';
                    }

                    $isDeleted2 = DB::table($table_name)
                        ->where('user_id', '=', $field['userId'])
                        ->where('props_id', '=', $field['propsId'])
                        ->delete();
                    echo "isDeleted2: " . $isDeleted2 . " x<br>";
                }
            } else {
                DB::table('fields')
                    ->updateOrInsert(
                        ['user_id' => $field['userId'], 'type' => $field['typeId'], 'props_id' => $field['propsId']],
                        ['position_id' => $field['positionId'], 'active' => $field['active'], 'deleted' => $field['deleted']]
                    );
            }
        }
    }
}
