-- FUNCTION: public.get_student_subjects(uuid)

-- DROP FUNCTION public.get_student_subjects(uuid);

CREATE OR REPLACE FUNCTION public.get_student_subjects(
	student_ids uuid)
    RETURNS TABLE(stdids integer, student_guid uuid, student_name character varying, student_lastname character varying, subjects json) 
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
    ROWS 1000

AS $BODY$
begin
    RETURN QUERY 
	SELECT id AS stdids,std.guid AS student_guid, std.firstname AS student_firstname,
 	std.lastname AS student_lastname, sub_array AS subjects
	FROM   students  std
	LEFT JOIN  (  -- or LEFT JOIN ?
   	SELECT stdsub.student_id AS id, json_agg(
   		json_build_object('subid', sub.id, 'code name',sub.code,'name',sub.name)) AS sub_array
   FROM   student_subjects stdsub
   JOIN   subjects sub  ON sub.id = stdsub.subject_id
   GROUP  BY stdsub.student_id
   ) sub USING (id)
   WHERE std.guid = student_ids; 
end;
$BODY$;

ALTER FUNCTION public.get_student_subjects(uuid)
    OWNER TO postgres;
