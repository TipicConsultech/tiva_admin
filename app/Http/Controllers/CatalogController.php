<?php

namespace App\Http\Controllers;

use App\Models\Catalog;
use Illuminate\Http\Request;

class CatalogController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }   


    public function allCatalog()
{
    try {
        $Catalog = Catalog::all();
        return response()->json($Catalog);
    } catch (\Exception $e) {
        return response()->json(['error' => 'Failed to fetch catalogs', 'message' => $e->getMessage()], 500);
    }
}


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
     
        'catalog_name'=>'required|string|max:255',
        'catalog_desc'=>'required|string|max:255',
        'img_address'=>'required|string',
        'qty'=>'required|integer'
      
        ]);


        $Catalog = new Catalog;
        $Catalog->catalog_name = $request->input('catalog_name');
        $Catalog->catalog_desc= $request->input('catalog_desc');
        $Catalog->img_address = $request->input('img_address');
        $Catalog->qty = $request->input('qty');

        $Catalog->save();
        


        return response()->json(['message' => 'Catalog  saved successfully'], 200);
    }
    /**
     * Display the specified resource.
     */
    public function show(Catalog $catalog)
    {
       
    }

/**      
 * Show All Catalogs
*/

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Catalog $catalog)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Catalog $catalog)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Catalog $catalog)
    {
        //
    }
}
